from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess


app = FastAPI()

# CORS(處理跨域資源共享) : 允許不同領域的請求
app.add_middleware(
    CORSMiddleware, # 跨域訪問設置
    allow_origins = ['*',
                     'https://github.com/EricbobXD/C_plus_plus_Blockly/edit/main/templates/block.j', 
                     'https://github.com/EricbobXD/C_plus_plus_Blockly/edit/main/templates/block.j', 
                     'https://github.com/EricbobXD/C_plus_plus_Blockly/edit/main/templates/block.j'],
    allow_credentials = True, # 允許請求攜帶憑據
    allow_methods = ['*'], # 允許所有HTTP方法
    allow_headers = ['*'] # 允許所有標頭 
)

templates = Jinja2Templates(directory='templates')

class Code(BaseModel):
    id_code : str

class Text(BaseModel):
    test_file : str

class Code_and_Text(BaseModel):
    id_code : str
    test_file : str

# create file
source_file = 'main.cpp'
executable_file = 'main'
test_file = 'test.txt'

@app.get('/')
async def read_root(request : Request):
    return templates.TemplateResponse('index.html',{"request" : request})

@app.post("/compile")
async def compile_code(code : Code):    
    if not code.id_code.strip():
        return {"status" : "error" , "message" : "Empty code"}

    # write code in source_file
    with open(source_file, 'w') as f:
        f.write(code.id_code)
    
    command = ['g++', source_file, '-o', executable_file]
    try:
        result = subprocess.run(command, check = True, stdout = subprocess.PIPE, stderr = subprocess.PIPE, text = True)
        subprocess.run(['rm' , source_file])
        return{"status" : "error" , "message" : "compile success"}

    except subprocess.CalledProcessError as e:
        subprocess.run(['rm' , source_file])
        error = f'{e.stderr}'.replace(f'{source_file}:', '')
        return {"status" : "error" , "message" : error}
    
@app.post('/run')
async def run_code(code : Text):

    with open(test_file, 'w') as f:
        f.write(code.test_file)

    command = f'cat {test_file} | ./{executable_file}'
    
    try:
        result = subprocess.run(command, shell = True, check = True, stdout = subprocess.PIPE, stderr = subprocess.PIPE, text = True)
        return {"status" : "x", "message" : result.stdout}
    
    except subprocess.CalledProcessError as e:
        return {"status" : "error" , "message" : e.stderr}
        
@app.post('/compile_and_run')
async def compile_and_run_code(code : Code_and_Text):
    if not code.id_code.strip():
        return {"status" : "error" , "message" : "Empty code"}
    
    # write code in source_file
    with open(source_file, 'w') as f:
        f.write(code.id_code)
    
    command = ['g++', source_file, '-o', executable_file]
    try:
        result = subprocess.run(command, check = True, stdout = subprocess.PIPE, stderr = subprocess.PIPE, text = True)
        with open(test_file, 'w') as f:
            f.write(code.test_file)

        command = f'cat {test_file} | ./{executable_file}'
        
        try:
            result = subprocess.run(command, shell = True, check = True, stdout = subprocess.PIPE, stderr = subprocess.PIPE, text = True)
            return {"status" : "x", "message" : result.stdout}
        
        except subprocess.CalledProcessError as e:
            return {"status" : "error" , "message" : e.stderr}
    
    except subprocess.CalledProcessError as e:
        error = f'{e.stderr}'.replace(f'{source_file}:', '')
        return {"status" : "error" , "message" : error}
