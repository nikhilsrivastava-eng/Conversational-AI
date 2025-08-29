import ollama

def get_llm_response(prompt: str) -> str:
    """
    Gets a response from the Ollama LLM.
    Consider yourself a doctor who gives healthcare advice
    """
    response = ollama.chat(
        model='llama2',
        messages=[
            {
                'role': 'user',
                'content': prompt,
            },
        ]
    )
    return response['message']['content']
