+++
authors = ["Huu-Long Pham"]
date = "2024-01-06"
title = "Ollama: How to use Hugging Face's models"
description = "How to import and use models from Hugging Face in Ollama"
tags = [
    "ollama",
    "llama",
    "huggingface",
]
categories = []
series = ["Ollama"]
+++

## Using Hugging Face Models in Ollama

[Ollama](https://github.com/jmorganca/ollama) is an incredible tool that empowers users to run language models locally. Notably, it offers both a convenient Command Line Interface (CLI) and an accessible API Server, which can be seamlessly integrated into your application code. The Ollama library is also a valuable resource, boasting a variety of pre-trained language models readily available for download. Moreover, for those with custom models in the `.gguf` format, Ollama supports easy imports.

As of January 6th, 2024, [Hugging Face](https://huggingface.co/) boasts a vast repository of over 350,000 public models. While Hugging Face's models are incredibly valuable, they are not provided in the `.gguf` format natively. In this article, I will guide you through the process of downloading models from Hugging Face and making them compatible with Ollama.

## How to Use Hugging Face Models in Ollama: A Step-by-Step Guide

Using Hugging Face's models in Ollama is a straightforward process, comprising the following steps:

1. **Download a Model from the Hugging Face Hub**
2. **Convert the Model into `.gguf` Format**
3. **Import the Model into Ollama**
4. **Utilize the Imported Model**

### Step 1: Download a Model from the Hugging Face Hub

First, ensure you have the Hugging Face CLI installed with the following command:

```bash
$ pip install -U "huggingface_hub[cli]"
```

Downloading a model from the Hugging Face Hub is as simple as using the following command. Note that larger models may require significant download times.

```bash
$ huggingface-cli download \
  <model-name> \
  --local-dir <local-directory-to-save-model> \
  --local-dir-use-symlinks False
```

For instance, to download the `elyza/ELYZA-japanese-Llama-2-7b` model and save its files locally in an `elyza` directory, run the following command:

```bash
$ huggingface-cli download \
  elyza/ELYZA-japanese-Llama-2-7b \
  --local-dir elyza \
  --local-dir-use-symlinks False
```

### Step 2: Convert the Model into `.gguf` Format

[Llama.cpp](https://github.com/ggerganov/llama.cpp) provides a convenient script to convert models into the `.gguf` format. Begin by cloning the `Llama.cpp` repository and installing the necessary Python packages:

```bash
$ git clone https://github.com/ggerganov/llama.cpp.git
$ pip install -r llama.cpp/requirements.txt
```

To convert the model you downloaded in the previous step, use the following command:

```bash
$ python llama.cpp/convert.py <local-directory-in-the-previous-step> \
  --outfile <output-gguf-filename> \
  --outtype q8_0
```

For example:

```bash
$ python llama.cpp/convert.py elyza \
  --outfile elyza.gguf \
  --outtype q8_0
```

Note: The `--outtype` parameter indicates number of bits to quantize to model to.
While `q8_0` stands for 8 bit, you can use `--outtype f16` (16 bit) or `--outtype f32` (32 bit) to improve quality, but infernce speed can be impacted.

This will generate a file named `elyza.guff` in your current directory.

### Step 3: Import Your Model into Ollama

Create a `Modelfile` with the following content:

```markdown
FROM <path-to-gguf-file>
```

For example:

```markdown
FROM ./elyza.gguf
```

Next, build your model using the created `Modelfile` and `.gguf` file:

```bash
$ ollama create elyza -f Modelfile
```

### Step 4: Test the Model

Finally, test your newly imported model using the following command:

```bash
$ ollama run <model-name> <prompt>
```

For instance:

```bash
$ ollama run elyza "日本の一番高い山は？"
```

## Conclusion

In this comprehensive guide, we've explored the step-by-step process of integrating Hugging Face language models into Ollama. By following these straightforward instructions, you can seamlessly harness the power of Hugging Face models within Ollama for your language processing needs. Enjoy exploring the possibilities!