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
	IsAlert       bool   `json:"is_alert"`
	IsFinish      bool   `json:"is_finish"`
	CreateTime    string `json:"create_time"`
	FinishTime    string `json:"finish_time"`
	EstimatedTime string `json:"estimated_time"`
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
