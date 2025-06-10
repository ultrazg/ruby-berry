package main

import "runtime"

func (a *App) Env() EnvInfo {
	return EnvInfo{
		AppName:    AppName,
		AppVersion: AppVersion,
		Platform:   runtime.GOOS,
		Arch:       runtime.GOARCH,
	}
}
