package main

import "runtime"

func (a *App) Env() EnvInfo {
	return EnvInfo{
		AppName:    AppName,
		AppVersion: AppVersion,
		Build:      Build,
		Platform:   runtime.GOOS,
		Arch:       runtime.GOARCH,
	}
}

func isWindows() bool {
	return runtime.GOOS == "windows"
}

func isMacOS() bool {
	return runtime.GOOS == "darwin"
}
