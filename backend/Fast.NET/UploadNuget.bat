@echo off

REM 使用 chcp 65001 命令将命令行窗口的代码页设置为 UTF-8
chcp 65001 > nul

echo 欢迎使用 Fast.NET 打包编译工具

REM 换行
echo.

REM 开启变量延迟
setlocal enabledelayedexpansion

REM 设置要编译和生成的 .sln 项目文件路径。使用 %~dp0 变量来获取 当前批处理文件所在的目录
set solution_file=%~dp0Fast.NET.sln

REM 设置多个可选择的 MSBuild.exe 文件路径
set "msbuild_path[1]=C:\Program Files\Microsoft Visual Studio\2022\Professional\MSBuild\Current\Bin\MSBuild.exe"
set "msbuild_path[2]=D:\Program Files\Microsoft Visual Studio\2022\Professional\MSBuild\Current\Bin\MSBuild.exe"

REM 定义一个标签
:MSBuildExeInput

echo 选择 MSBuild.exe 文件：
echo [1] !msbuild_path[1]!
echo [2] !msbuild_path[2]!

REM 换行
echo.

REM 数据数字
choice /c 12 /n /m "输入当前计算机所存在的 MSBuild.exe 文件路径的编号："

REM 获取输入的值，得到 MSBuild.exe 文件路径
set "msbuild_path=!msbuild_path[%errorlevel%]!"

REM 判断是否输入正确
if not defined msbuild_path (
	echo 输入有误，请重新输入。
	goto MSBuildExeInput
)

REM 换行
echo.

REM 设置多个生成模式
set build_mode[1]=Debug
set build_mode[2]=Release

REM 定义一个标签
:BuildMode

echo 选择生成模式： 
echo [1] !build_mode[1]!
echo [2] !build_mode[2]!

REM 换行
echo.

REM 数据数字
choice /c 12 /n /m "输入当前需要生成的模式："

REM 获取输入的值，得到 MSBuild.exe 文件路径
set "build_mode=!build_mode[%errorlevel%]!"

REM 判断是否输入正确
if not defined build_mode (
	echo 输入有误，请重新输入。
	goto BuildMode
)

REM 换行
echo.

REM 输出执行命令
echo "%msbuild_path%" /nologo /verbosity:minimal /t:Clean,Build "%solution_file%" /p:Configuration=%build_mode% 

REM 换行
echo.

REM 编译生成项目，指定 Debug 模式
REM /nologo 禁用 MSBuild 的 Logo 输出
REM /verbosity:minimal 减少详情输出
REM /t:Clean,Build 先清理，再生成
REM /p:Configuration=Debug 指定 Debug 生成
"%msbuild_path%" -noLogo -verbosity:minimal -target:Clean;Compile;Build "%solution_file%" -property:Configuration=%build_mode%

REM 判断是否编译生成成功
if %errorlevel% equ 0 (
	REM 换行
	echo.

	echo 编译，生成成功...... 
) else (
	REM 换行
	echo.

	echo 编译，生成失败...... 
)

REM 结束关闭变量延迟
endlocal

REM 换行
echo.

REM 上传 Nuget 服务器


REM 等待用户按下任意键继续。
REM pause

set /p="按任意键继续 . . ." <nul
pause >nul
