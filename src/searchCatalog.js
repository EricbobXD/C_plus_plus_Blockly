import { legacySearchItems } from './legacyBlocks.js';

export const SEARCHABLE_BLOCKS = [
  { type: 'cpp_include', label: '引入標頭檔', group: '程式結構', description: '加入 iostream、string、vector 等 C++ 標頭檔', aliases: 'include header library 標頭 標头 頭文件 標頭檔 引入 函式庫', example: '#include <iostream>', inputSummary: '選擇要引入的標頭檔' },
  { type: 'cpp_cin', label: '讀取輸入到變數', group: '輸入與輸出', description: '從輸入資料讀取變數', aliases: 'cin input 讀取 輸入 输入 讀入 读取 讀進 標準輸入', example: 'std::cin >> value;', inputSummary: '選擇接收輸入的變數' },
  { type: 'text_print', label: '輸出文字', group: '輸入與輸出', description: '將文字或運算結果輸出至主控台', aliases: 'cout print output 輸出 输出 顯示 显示 印出 列印 打印 寫出', example: 'std::cout << value;', inputSummary: '接上要輸出的文字或運算結果' },
  { type: 'text', label: '文字', group: '文字與註解', description: '建立字串內容', aliases: 'string 字串 字符串 文本 文字 字串常數 字符串常量 字面值', example: '"Hello"', inputSummary: '編輯文字內容' },
  { type: 'math_number', label: '數字', group: '運算', description: '數值常數', aliases: 'number 數值 數字 常數 整數 數字常數', example: '42', inputSummary: '輸入數值' },
  { type: 'logic_boolean', label: '真假值', group: '運算', description: '建立 true 或 false', aliases: 'boolean bool true false 布林 布尔 真 假 真假 布林值 布尔值 邏輯值', example: 'true', inputSummary: '選擇 true 或 false' },
  { type: 'controls_repeat_ext', label: '重複執行', group: '流程控制', description: '重複執行指定次數', aliases: 'repeat loop for 重複 重复 循環 循环 迴圈 回圈 次數', example: 'for (int i = 0; i < 3; ++i) { ... }', inputSummary: '設定重複次數並接上要執行的方塊' },
  { type: 'controls_whileUntil', label: '當條件成立時重複', group: '流程控制', description: '使用條件控制迴圈', aliases: 'while loop 條件迴圈 條件循环 回圈 當成立 重複直到', example: 'while (condition) { ... }', inputSummary: '設定條件並接上迴圈內容' },
  { type: 'controls_for', label: '計數迴圈', group: '流程控制', description: '設定初值、終值與遞增值', aliases: 'for loop 計數 計数 計數迴圈 for迴圈 for循环 回圈', example: 'for (int i = 0; i < 10; ++i) { ... }', inputSummary: '設定變數、起始值、終止值與遞增值' },
  { type: 'variables_set', label: '設定變數', group: '宣告與型別', description: '將值指定給變數', aliases: 'variable assign set 變數 变量 變量 設定 设置 指派 賦值 赋值', example: 'value = 42;', inputSummary: '選擇變數並接上要指定的值' },
  { type: 'define_array', label: '定義陣列', group: '陣列與容器', description: '宣告固定大小的 C++ 陣列並設定資料型別與元素數量', aliases: 'array 陣列 数组 數組 建立陣列 建立数组 宣告陣列 声明数组', typoAliases: ['陳列'], typoCorrections: { '陳列': '陣列' }, example: 'int values[5];', inputSummary: '設定陣列名稱、資料型別與大小' },
  { type: 'define_function', label: '定義函式', group: '程式結構', description: '建立可重複呼叫的 C++ 函式並設定回傳型別與參數', aliases: 'function 函式 函數 函数 函式宣告 函數聲明 define', typoAliases: ['函示', 'fucntion'], typoCorrections: { '函示': '函式', 'fucntion': 'function' }, example: 'int add(int a, int b) { return a + b; }', inputSummary: '設定回傳型別、名稱、參數與函式內容' },
  ...legacySearchItems.filter((item) => item.group !== '舊版方塊'),
];
