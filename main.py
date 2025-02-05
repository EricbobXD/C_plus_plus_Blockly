from fastapi import FastAPI, Request
from fastapi import FastAPI, Request,  BackgroundTasks, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import subprocess
import os
import time



app = FastAPI()

# CORS(處理跨域資源共享) : 允許不同領域的請求
app.add_middleware(
    CORSMiddleware, # 跨域訪問設置
    allow_origins = ['*'],
    allow_credentials = True, # 允許請求攜帶憑據
    allow_methods = ['*'], # 允許所有HTTP方法
    allow_headers = ['*'] # 允許所有標頭 
)

templates = Jinja2Templates(directory='templates')
public_dir = os.getenv('PUBLIC_DIR', 'public')
app.mount("/public", StaticFiles(directory=public_dir), name="public")

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
os.makedirs('app/tmp', exist_ok=True)
def compile(id_code):
     # write code in source_file
    with open(source_file, 'w') as f:
        f.write(id_code)
    
    command = ['g++', source_file, '-o', executable_file]
    try:
        result = subprocess.run(command, check = True, stdout = subprocess.PIPE, stderr = subprocess.PIPE, text = True)
        subprocess.run(['rm' , source_file])
        return{"status" : "error" , "message" : "compile success"}

    except subprocess.CalledProcessError as e:
        subprocess.run(['rm' , source_file])
        error = f'{e.stderr}'.replace(f'{source_file}:', '')
        return {"status" : "error" , "message" : error}

def run(test_file):
    with open(test_file, 'w') as f:
        f.write(test_file)

    command = f'cat {test_file} | ./{executable_file}'
    
    try:
        result = subprocess.run(command, shell = True, check = True, stdout = subprocess.PIPE, stderr = subprocess.PIPE, text = True)
        return {"status" : "x", "message" : result.stdout}
    
    except subprocess.CalledProcessError as e:
        return {"status" : "error" , "message" : e.stderr}

pre = time.time()
def cleanup():
    global active_tmp_dir
    now = time.time() 
    if pre - now > 300 or pre == now:
        os.system('rm -rf /app/tmp')
    
    time.sleep(300)
    


@app.get('/')
async def read_root(request : Request):
    return templates.TemplateResponse('index.html',{"request" : request})

@app.post("/compile")
async def compile_code(code : Code):    
    compile(code.id_code)
        
@app.post('/compile_and_run')
async def compile_and_run_code(code : Code_and_Text):
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
