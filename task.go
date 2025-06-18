package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/spf13/viper"
)

const taskDataConf = "task_data.json"

var taskDataFilePath string

func init() {
	initTaskDataFile()
}

func initTaskDataFile() {
	if isMacOS() {
		configDir, err := os.UserConfigDir()
		if err != nil {
			log.Printf("获取用户配置目录失败: %v", err)
		}

		taskDataFilePath = filepath.Join(configDir, AppName)
		if err := os.MkdirAll(taskDataFilePath, os.ModePerm); err != nil {
			log.Printf("创建配置目录失败: %v", err)
		}
	} else {
		taskDataFilePath = "."
	}

	configFile := filepath.Join(taskDataFilePath, taskDataConf)

	println("配置文件：", configFile)

	viper.SetConfigFile(configFile)
	viper.SetConfigType("json")

	setDefaults()

	if !isExist(configFile) {
		if err := viper.SafeWriteConfigAs(configFile); err != nil {
			log.Printf("创建配置文件失败: %v", err)
		}
	} else {
		if err := viper.ReadInConfig(); err != nil {
			log.Printf("读取配置文件失败: %v", err)
		}
	}
}

func setDefaults() {
	viper.SetDefault("records", []TaskData{})
}

func (a *App) ReadTaskData() ReadConfigResult {
	var taskData TaskData
	if err := viper.Unmarshal(&taskData); err != nil {
		log.Printf("解析配置文件失败: %v", err)

		return ReadConfigResult{
			Flag:     false,
			Error:    err.Error(),
			TaskData: TaskData{},
		}
	}

	return ReadConfigResult{
		Flag:     true,
		Error:    "",
		TaskData: taskData,
	}
}

func (a *App) AddTaskData(item TaskItem) string {
	var taskData TaskData

	if err := viper.Unmarshal(&taskData); err != nil {
		log.Printf("解析配置文件失败: %v", err)
		return fmt.Sprintf("读取数据失败，请尝试重启应用: %v", err.Error())
	}

	taskData.Records = append(taskData.Records, item)
	viper.Set("records", taskData.Records)
	if err := viper.WriteConfig(); err != nil {
		log.Printf("添加任务失败: %v", err)

		return fmt.Sprintf("添加任务失败: %v", err.Error())
	}

	return ""
}

func (a *App) DeleteTaskData(id string) string {
	var taskData TaskData

	if err := viper.Unmarshal(&taskData); err != nil {
		log.Printf("解析配置文件失败: %v", err)
		return fmt.Sprintf("读取数据失败，请尝试重启应用: %v", err.Error())
	}

	for i, task := range taskData.Records {
		if task.ID == id {
			taskData.Records = append(taskData.Records[:i], taskData.Records[i+1:]...)
			viper.Set("records", taskData.Records)
			if err := viper.WriteConfig(); err != nil {
				return fmt.Sprintf("删除任务失败: %v", err)
			}
			return ""
		}
	}

	return fmt.Sprintf("找不到匹配的任务 ID: %s", id)
}

func (a *App) UpdateTaskData(id string, item TaskItem) UpdateConfigResult {
	var taskData TaskData
	if err := viper.Unmarshal(&taskData); err != nil {
		return UpdateConfigResult{
			Flag:  false,
			Error: fmt.Sprintf("解析配置文件失败: %v", err),
		}
	}

	for i, task := range taskData.Records {
		if task.ID == id {
			taskData.Records[i] = item
			viper.Set("records", taskData.Records)
			if err := viper.WriteConfig(); err != nil {
				return UpdateConfigResult{
					Flag:  false,
					Error: fmt.Sprintf("更新任务失败: %v", err),
				}
			}
			return UpdateConfigResult{
				Flag:  true,
				Error: "",
			}
		}
	}

	return UpdateConfigResult{
		Flag:  false,
		Error: fmt.Sprintf("找不到匹配的任务 ID: %s", id),
	}
}
