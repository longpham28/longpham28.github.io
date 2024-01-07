+++
authors = ["Huu-Long Pham"]
date = "2023-01-04"
title = "Prompt Template and Output Parser in Langchain"
description = "Why and how to use Prompt Template and Output Parser in Langchain"
tags = [
    "langchain",
    "llm",
    "python",
]
categories = []
series = ["Langchain"]
+++

# Why You Should Use Langchain's Prompt Template

When working with language models like ChatGPT, it's common to encounter scenarios where you need to provide specific instructions or prompts to generate desired content. This can sometimes lead to complex and hard-to-maintain code, especially when dealing with intricate tasks. In this article, we'll explore how Langchain's Prompt Template can simplify and streamline the process, making it easier to work with large language models.

## The Challenge of Complex Prompts

Let's begin by examining a common scenario: requesting a program from ChatGPT in a specific programming language using the `openai` package. Here's an example:

```python
import openai

client = OpenAI()
prompt = """
Create a program in python that satisfies the following specifications:
implement quick sort
"""
response = client.chat.completions.create(
    model_name="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": prompt}
    ]
)
print(response.choices[0].message.content)
# Sure! Here's an implementation of the Quick Sort algorithm in Python:
# ...
```

This approach works fine for simple tasks. However, as prompts become more complex, maintaining code readability becomes increasingly challenging.

## Introducing Langchain's Prompt Template

To address this issue, Langchain offers a powerful alternative using its prompt template feature. Let's see how it simplifies the process:

```python
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI

chat = ChatOpenAI()
prompt_template = ChatPromptTemplate.from_template("""
Create a program in {language} that satisfies the following specifications:
{specifications}
""")
messages = prompt_template.format_messages(
    language="ruby",
    specifications="implement quick sort"
)
response = chat(messages)
print(response.content)
# Sure! Here's an implementation of the Quick Sort algorithm in Ruby:
# ...
```

With Langchain's Prompt Template, you can easily customize prompts by filling in placeholders, making your code more organized and maintainable.

## Chaining Langchain Features

Langchain's capabilities go beyond prompt templates. You can also chain various features together to enhance your interactions with language models. Let's explore a few examples.

### Langchain's Output Parsers

You can modify the output of language models and transform it into a desired format. By default, output from `langchain.chat_models` are `Message` objects:

```python
from langchain.chat_models import ChatOpenAI

chat = ChatOpenAI()
prompt = "Git command to discard unstaged changes"
response = chat.invoke(prompt)
response
# AIMessage(content='The git command to discard unstaged changes is "git checkout -- <file>".')
```

However, by chaining the `StrOutputParser` with chat models, you can easily transform the output into a string:

```python
from langchain.chat_models import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

chat = ChatOpenAI()
output_parser = StrOutputParser()
chat_chained = chat | output_parser
prompt = "Git command to discard staged changes"
response = chat_chained.invoke(prompt)
response
# To discard staged changes in Git, you can use the "git reset" command with the "--mixed" option. 
# ...
```

In this example, we've chained a chat model with an output parser, demonstrating the flexibility of Langchain.

### Chaining Prompt Templates and Output Parsers

You can combine prompt templates, chat models, and output parsers to create powerful workflows. Here's an example that demonstrates this approach:

```python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

prompt_template = ChatPromptTemplate.from_messages([
    ("system", "You are a great teacher who can explain difficult concepts to even primary school students"),
    ("user", "{input}")
])
chat = ChatOpenAI()
output_parser = StrOutputParser()

chat_chained = prompt_template | chat | output_parser
response = chat_chained.invoke({"input": "What is Transformer Encoder"})
response
# A Transformer encoder is a part of a machine learning model called the Transformer, 
# which is used for tasks like natural language processing and machine translation. 
# ...
```

By chaining prompt templates, chat models, and output parsers, you can create seamless and customized interactions with language models.

### Structured Output Parsing

Langchain's Output Parsers can even transform language models' output into complex objects, such as Python dictionaries. For example, you can extract information from code snippets, including the programming language used, a summary of the code, and the libraries used:

```python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema, StructuredOutputParser

# Define output schema
language_schema = ResponseSchema(
    name="language",
    description="programming language used",
    type="str"
)
summary_schema = ResponseSchema(
    name="summary",
    description="brief summary of the code",
    type="str"
)
libraries_schema = ResponseSchema(
    name="libraries",
    description="libraries used as list",
    type="list"
)

# Create a structured output parser
output_parser = StructuredOutputParser.from_response_schemas(
    [
        language_schema,
        summary_schema,
        libraries_schema
    ]
)

prompt_template = ChatPromptTemplate.from_messages([
    ("system", "You are the best programmer ever"),
    ("user", """Given the following program, extract information described in format instructions
    
    Program:
    {program}

    Format Instructions:
    {format_instructions}
    """)
])

chat = ChatOpenAI()

chat_chained = prompt_template | chat | output_parser
response = chat_chained.invoke({
    "program": """
        # Importing libraries 

        import numpy as np 
        import pandas as pd 
        import scipy as stats 

        # calculateMahalanobis function to calculate 
        # the Mahalanobis distance 
        def calculateMahalanobis(y=None, data=None, cov=None): 
            y_mu = y - np.mean(data) 
            if not cov: 
                cov = np.cov(data.values.T) 
            inv_covmat = np.linalg.inv(cov) 
            left = np.dot(y_mu, inv_covmat) 
            mahal = np.dot(left, y_mu.T) 
            return mahal.diagonal() 
        """, 
   "format_instructions": output_parser.get_format_instructions()
})

print(response)
# {
#     'language': 'Python', 
#     'summary': 'This code calculates the Mahalanobis distance using the provided data and covariance matrix.', 
#     'libraries': ['numpy, pandas, scipy']
#  }
```

## Conclusion

Langchain's Prompt Templates and Output Parsers provide powerful tools to simplify and enhance your interactions with large language models. Whether you need to create custom prompts, transform output, or extract structured information, Langchain makes it easier to work with language models effectively and efficiently.