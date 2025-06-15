package main

import "os"

func isExist(path string) bool {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return false
	}

	return true
}

func RemoveFile(path string) error {
	if isExist(path) {
		err := os.Remove(path)
		if err != nil {
			return err
		}
	}

	return nil
}
