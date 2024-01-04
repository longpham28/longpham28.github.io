+++
authors = ["Huu-Long Pham"]
date = "2023-07-08"
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

## Why using Langchain's Prompt Template

Consider the following example of asking ChatGPT to write a program for us in a specified language, using `openai` package only.

```python
import openai

client = OpenAI()
prompt = """
Create a program in python that statisfies the following specifications:
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
#
# ```python
# def partition(arr, low, high):
#     i = low - 1
#     pivot = arr[high]
#    
#     for j in range(low, high):
#         if arr[j] <= pivot:
#             i += 1
#             arr[i], arr[j] = arr[j], arr[i]
#    
#     arr[i + 1], arr[high] = arr[high], arr[i + 1]
#     return i + 1
#
#
# def quick_sort(arr, low, high):
#     if low < high:
#         pivot = partition(arr, low, high)
#         quick_sort(arr, low, pivot - 1)
#         quick_sort(arr, pivot + 1, high)
# ```
```

Obviously, there is no problem with the above approach. However, when the prompt becomes much complex, it would be difficult maintaining our code's readability. Therefore, there is an alternative way using langchain's prompt template.

```python
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI

chat = ChatOpenAI()
prompt_template = ChatPromptTemplate.from_template("""
Create a program in {language} that statisfies the following specifications:
{specifications}
""")
messages = prompt_template.format_messages(
    language="ruby",
    specifications="implement quick sort"
)
response = chat(messages)
print(response.content)
# Sure! Here's an implementation of the Quick Sort algorithm in Ruby:
#
# ```ruby
# def quick_sort(arr)
#   return arr if arr.length <= 1
#
#   pivot = arr.delete_at(rand(arr.length))
#   less, greater = arr.partition { |num| num < pivot }
#
#   return *quick_sort(less), pivot, *quick_sort(greater)
# end
```
