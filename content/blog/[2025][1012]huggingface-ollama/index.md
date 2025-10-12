---
title: Hugging FaceのモデルをOllamaで使用する方法
date: 2025-10-12
description: Hugging FaceのモデルをOllamaで使用する方法
---

## Introduction

`.safetensors`形式の Hugging Face のモデルを Ollama で使用する方法を紹介する。

## Overview

`.safetensors`モデルを直接 Ollama に取り込むことはできない。
そのため、まず Hugging Face からダウンロードした`.safetensors`ファイルを`GGUF`に変換し、
得られた`GGUF`ファイルを Ollama に取り込む必要がある。
大まかな流れは以下のとおり。

1. 事前準備：必要なツールをダウンロードする。
2. Hugging Face モデルをダウンロードする。
3. モデルを`.safetensors`から`GGUF`に変換する。
4. モデルを Ollama に取り込む。

## Step by Step

### 事前準備

モデル変換に用いる[`llama.cpp`](https://github.com/ggml-org/llama.cpp/discussions/2948) というプログラムをダウンロードし、必要な外部ライブラリーをダウンロードする

```bash
$ git clone git@github.com:ggml-org/llama.cpp.git
$ cd llama.cpp
$ pip install -r requirements.txt
```

### Hugging Face モデルのダウンロード

Python スクリプトで Hugging Face モデルをダウンロードする。
モデルのダウンロードは`huggingface_hub`というライブラリを用いて行う。
例えば、以下のコマンドで`SakanaAI/EvoVLM-JP-v1-7B`というモデルをダウンロードする。

```bash
$ cd <モデルファイルのダウンロード先フォルダー>
$ pip install huggingface_hub
$ python
>>> from huggingface_hub import snapshot_download
>>> model_id = "SakanaAI/EvoVLM-JP-v1-7B"
>>> snapshot_download(
        repo_id=model_id,
        local_dir="sakanai-evovlm",
        local_dir_use_symlinks=False,
        revision="main"
    )
>>> exit()
```

### モデルファイルの変換

事前準備でダウンロードした`llama.cpp`を使いモデルファイルを`.safetensors`から`GGUF`に変換する

```bash
$ cd <ダウンロードしたllama.cppのフォルダー>
$ python3 convert_hf_to_gguf.py <ダウンロードしたHugging Faceモデルのフォルダー>
```

上記コマンドを実行すると、`.safetensors`モデルと同じフォルダーに`GGUF`形式ファイルが出力される。

### モデルの Ollama への取り込み

定義ファイルを`vim`などで作成する

```bash
$ vim Modelfile
```

```text
FROM <GGUFモデルのパス>
```

Ollama でモデルをビルドし、起動する

```bash
$ ollama create <任意のモデル名> -f ./Modelfile
$ ollama run <任意のモデル名>
```

## Conclusion

今回は Hugging Face の`.safetensors`形式モデルを Ollama で使用する方法について紹介した。
