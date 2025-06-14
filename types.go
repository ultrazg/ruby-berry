package main

import "context"

type App struct {
	ctx context.Context
}

type EnvInfo struct {
	AppName    string `json:"app_name"`
	AppVersion string `json:"app_version"`
	Platform   string `json:"platform"`
	Arch       string `json:"arch"`
}
