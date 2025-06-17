package main

import "context"

type App struct {
	ctx context.Context
}

type EnvInfo struct {
	AppName    string `json:"app_name"`
	AppVersion string `json:"app_version"`
	Build      string `json:"build"`
	Platform   string `json:"platform"`
	Arch       string `json:"arch"`
}

type TaskData struct {
	Records []TaskItem `json:"records"`
}

type TaskItem struct {
	ID            string `json:"id"`
	Title         string `json:"title"`
	IsAlert       bool   `json:"isAlert"`
	IsFinish      bool   `json:"isFinish"`
	CreateTime    string `json:"createTime"`
	FinishTime    string `json:"finishTime"`
	EstimatedTime string `json:"estimatedTime"`
}

type ReadConfigResult struct {
	Flag     bool     `json:"flag"`
	Error    string   `json:"error"`
	TaskData TaskData `json:"task_data"`
}

type UpdateConfigResult struct {
	Flag  bool   `json:"flag"`
	Error string `json:"error"`
}
