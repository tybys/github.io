package web

import (
	"fmt"
	"github.com/yvasiyarov/canvas"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func downloadMediaFile(requestURI string, rootMediaUrl string) (error, []byte) {
	url := rootMediaUrl + requestURI
	resp, err := http.Get(url)

	if err != nil {
		log.Printf("Can not download media file %#v \n", err)
		return err, nil
	}

	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		log.Printf("Can not download media file: %s Response code: %d \n", url, resp.StatusCode)
		return fmt.Errorf("Can not download media file. Response code: %d \n", resp.StatusCode), nil
	}

	if body, err := ioutil.ReadAll(resp.Body); err != nil {
		log.Printf("Can not download media file %#v \n", err)
		return err, nil
	} else {
		return nil, body
	}
	return nil, nil
}

func saveMediaFile(requestURI string, fileContent []byte, rootPath string) {
	dirPerm := os.FileMode(0777)
	dirParts := strings.Split(requestURI, "/")
	dirPath := rootPath + "/public" + strings.Join(dirParts[:len(dirParts)-1], "/")

	if err := os.MkdirAll(dirPath, dirPerm); err != nil {
		log.Printf("Can not create dir: %s, got error: %#v \n", dirPath, err)
	} else {
		perm := os.FileMode(0777)
		file := rootPath + "/public" + requestURI

		if err := ioutil.WriteFile(file, fileContent, perm); err != nil {
			log.Printf("Can not save downloaded media file %#v \n", err)
		} else {
			log.Printf("File %s was saved  \n", file)
		}
	}
}

func mediaFileDownloadAndSave(requestURI string, rootMediaUrl string, rootPath string, isRootMedia int) (error, []byte) {
	if isRootMedia == 1 {
		return fmt.Errorf("Its admin node, so we can not download media file from other node\n"), nil
	} else {
		if err, body := downloadMediaFile(requestURI, rootMediaUrl); err == nil {
			saveMediaFile(requestURI, body, rootPath)
			return nil, body
		} else {
			return err, nil
		}
	}
	return nil, nil
}

func resizeAndSaveProductImage(fileContent []byte, requestURI string, rootPath string) (error, []byte) {
	imageCanvas := canvas.New()
	defer imageCanvas.Destroy()

	requestParts := strings.Split(requestURI, "/")
	//if url does not has size part(its just hash), then just dont resize it 
	if len(requestParts[6]) == 32 {
		saveMediaFile(requestURI, fileContent, rootPath)
		return nil, fileContent
	}

	sizeParts := strings.Split(requestParts[6], "x")
	width, _ := strconv.Atoi(sizeParts[0])
	height, _ := strconv.Atoi(sizeParts[1])

	if err := imageCanvas.OpenBlob(fileContent, uint(len(fileContent))); err != nil {
		log.Printf("Can not open image blob %#v \n", err)
		return err, nil
	} else {
		if err := imageCanvas.ResizeWithFilter(uint(width), uint(height), canvas.HANNING_FILTER, 1.0); err != nil {
			log.Printf("Can not resize image %#v \n", err)
			return err, nil
		} else if err := imageCanvas.SharpenImage(1.0, 1.0, 0); err != nil {
			log.Printf("Can not sharpen image %#v \n", err)
			return err, nil
		} else {
			imageCanvas.SetQuality(85); //set quality to 85% to minimize image size
			if resizedFileContent, err := imageCanvas.GetImageBlob(); err != nil {
				log.Printf("Can not get image blob %#v \n", err)
				return err, nil
			} else {
				saveMediaFile(requestURI, resizedFileContent, rootPath)
				return nil, resizedFileContent
			}
		}
	}
	return nil, nil
}

func MediaFileDownload(w http.ResponseWriter, req *http.Request, context *RequestContext) {
	rootMediaUrl, _ := context.WebHandler.Config.GetStringValue("root_media_url")
	rootPath, _ := context.WebHandler.Config.GetStringValue("root_path")
	isRootMedia, _ := context.WebHandler.Config.GetIntValue("is_root_path")

	var requestURI string
	if req.RequestURI[len(req.RequestURI)-1] == '/' {
		requestURI = req.RequestURI[:len(req.RequestURI)-1]
	} else {
		requestURI = req.RequestURI
	}

	log.Printf("Request %s was accepted  \n", req.RequestURI)
	requestParts := strings.Split(requestURI, "/")
	log.Printf("Request %#v was accepted  \n", requestParts)

	if (len(requestParts) > 5 && requestParts[4] == "cache") ||
		(requestParts[2] == "brands" && requestParts[3] == "cache") {
		var srcFilePath string
		if len(requestParts[6]) == 32 {
			srcFilePath = strings.Join(requestParts[:4], "/") + "/" + strings.Join(requestParts[7:], "/")
		} else if requestParts[2] == "brands" {
			srcFilePath = "/media/brands/" + requestParts[6]
		} else {
			srcFilePath = strings.Join(requestParts[:4], "/") + "/" + strings.Join(requestParts[8:], "/")
		}

		if srcContent, err := ioutil.ReadFile(rootPath + "/public" + srcFilePath); err != nil {
			//try download src file
			if err, srcContent := mediaFileDownloadAndSave(srcFilePath, rootMediaUrl, rootPath, isRootMedia); err != nil {
				w.WriteHeader(http.StatusNotFound)
			} else {
				if err, resizedFileContent := resizeAndSaveProductImage(srcContent, requestURI, rootPath); err != nil {
					w.WriteHeader(http.StatusNotFound)
				} else {
					w.Write(resizedFileContent)
				}
			}
		} else {
			if err, resizedFileContent := resizeAndSaveProductImage(srcContent, requestURI, rootPath); err != nil {
				w.WriteHeader(http.StatusNotFound)
			} else {
				w.Write(resizedFileContent)
			}
		}
	} else {
		if err, body := mediaFileDownloadAndSave("/"+requestURI[1:], rootMediaUrl, rootPath, isRootMedia); err != nil {
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.Write(body)
		}
	}
}
