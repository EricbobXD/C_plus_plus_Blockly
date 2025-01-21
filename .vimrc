syntax on
set nu
set ai
set tabstop=4
set shiftwidth=4
set expandtab
set mouse=a
set incsearch
execute pathogen#infect()

autocmd VimEnter * NERDTree
autocmd BufEnter NERD_tree_* | execute 'normal R'
imap jk <Esc>
nmap ww :w<CR>
nmap qq :qa<CR>
nmap wq :w<CR>:qa<CR>

inoremap ( ()<Esc>i
inoremap " ""<Esc>i
inoremap ' ''<Esc>i
inoremap [ []<Esc>i
inoremap { {}<ESC>i

filetype indent on

autocmd BufNewFile *.cpp 0r ~/.vim/templates/skeleton.cpp
