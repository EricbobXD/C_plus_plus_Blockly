export const bubble_sort_block = (name) => {
    return {
        "kind": "block",
        "type": "for_block",
        "inputs": {
            "init": {
                "shadow": {
                    "type": "compare_block", 
                    "inputs": {
                        "A": {
                            "shadow": {
                                "type": "get_VAR", 
                                "fields": {"Name": "i"}
                            }
                        }, 
                        "B": {
                            "shadow": {
                                "type": "number", 
                                "fields": {"NUMBER": "0"}
                            }
                        }
                    }
                }
            },
            "condition": {
                "shadow": {
                    "type": "logic_operators",
                    "fields": { "OPERATOR": "LESS" },
                    "inputs": {
                        "A": { 
                            "shadow": { 
                                "type": "get_VAR", 
                                "fields": { "Name": "i" } 
                            } 
                        }, 
                        "B": {
                            "shadow": {
                                "type": "math_divide_", 
                                "inputs": {
                                    "A": {
                                        "shadow": {
                                            "type": "sizeof", 
                                            "inputs": {
                                                "obj": {
                                                    "shadow": {
                                                        "type": "array_name", 
                                                        "fields": {"Name": name}
                                                    }
                                                }
                                            }
                                        }
                                    }, 
                                    "B": {
                                        "shadow": {
                                            "type": "sizeof", 
                                            "inputs": {
                                                "obj": {
                                                    "shadow": {
                                                        "type": "array_operate[]", 
                                                        "fields": {"Name": name}, 
                                                        "inputs": {
                                                            "pos": {
                                                                "shadow": {
                                                                    "type": "number", 
                                                                    "fields": {"NUMBER": "0"}
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "iter": {
                "shadow": {
                    "type": "var_calculate",
                    "fields": { "OPERATOR": "ADD_EQUALS" },
                    "inputs": {
                        "A": { 
                            "shadow": { 
                                "type": "get_VAR", 
                                "fields": { "Name": "i" } 
                            } 
                        },
                        "B": { 
                            "shadow": { 
                                "type": "number", 
                                "fields": { "NUMBER": "1" } 
                            } 
                        }
                    }
                }
            },
            "DO": {
                "block": {
                    "type": "for_block",
                    "inputs": {
                        "init": {
                            "shadow": {
                                "type": "compare_block", 
                                "inputs": {
                                    "A": {
                                        "shadow": {
                                            "type": "get_VAR", 
                                            "fields": {"Name": "j"}
                                        }
                                    }, 
                                    "B": {
                                        "shadow": {
                                            "type": "get_VAR", 
                                            "fields": {"Name": "i"}
                                        }
                                    }
                                }
                            }
                        },
                        "condition": {
                            "shadow": {
                                "type": "logic_operators",
                                "fields": { "OPERATOR": "LESS" },
                                "inputs": {
                                    "A": { 
                                        "shadow": { 
                                            "type": "get_VAR", 
                                            "fields": { "Name": "j" } 
                                        } 
                                    }, 
                                    "B": {
                                        "shadow": {
                                            "type": "math_divide_", 
                                            "inputs": {
                                                "A": {
                                                    "shadow": {
                                                        "type": "sizeof", 
                                                        "inputs": {
                                                            "obj": {
                                                                "shadow": {
                                                                    "type": "array_name", 
                                                                    "fields": {"Name": name}
                                                                }
                                                            }
                                                        }
                                                    }
                                                }, 
                                                "B": {
                                                    "shadow": {
                                                        "type": "sizeof", 
                                                        "inputs": {
                                                            "obj": {
                                                                "shadow": {
                                                                    "type": "array_operate[]", 
                                                                    "fields": {"Name": name}, 
                                                                    "inputs": {
                                                                        "pos": {
                                                                            "shadow": {
                                                                                "type": "number", 
                                                                                "fields": {"NUMBER": "0"}
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "iter": {
                            "shadow": {
                                "type": "var_calculate",
                                "fields": { "OPERATOR": "ADD_EQUALS" },
                                "inputs": {
                                    "A": { 
                                        "shadow": { 
                                            "type": "get_VAR", 
                                            "fields": { "Name": "j" } 
                                        } 
                                    },
                                    "B": { 
                                        "shadow": { 
                                            "type": "number", 
                                            "fields": { "NUMBER": "1" } 
                                        } 
                                    }
                                }
                            }
                        },
                        "DO": {
                            "block": {
                                "type": "if_block",
                                "inputs": {
                                    "IF_VALUE": {
                                        "shadow": {
                                            "type": "logic_operators",
                                            "fields": { "OPERATOR": "GREATER" },
                                            "inputs": {
                                                "A": { 
                                                    "shadow": { 
                                                        "type": "array_operate[]", 
                                                        "fields": {"Name": name}, 
                                                        "inputs": {
                                                            "pos": {
                                                                "shadow": {
                                                                    "type": "get_VAR", 
                                                                    "fields": {"Name": "j"}
                                                                }
                                                            }
                                                        }
                                                    } 
                                                }, 
                                                "B": { 
                                                    "shadow": { 
                                                        "type": "array_operate[]", 
                                                        "fields": {"Name": name}, 
                                                        "inputs": {
                                                            "pos": {
                                                                "shadow": {
                                                                    "type": "get_VAR", 
                                                                    "fields": {"Name": "j"}
                                                                }
                                                            }
                                                        }
                                                    } 
                                                }
                                            }
                                        }
                                    },
                                    "IF_DO": {
                                        "shadow": {
                                            "type": "define_VAR_",
                                            "fields": { 
                                                "const": "no", 
                                                "unsigned": "no", 
                                                "Name": "tmp", 
                                                "mode": "val"
                                            }, 
                                            "inputs": {
                                                "type": { 
                                                    "shadow": { 
                                                        "type": "data_type", 
                                                        "fields": {"TYPE": "int"} 
                                                    }
                                                }, 
                                                "value": {
                                                    "shadow": {
                                                        "type": "array_operate[]", 
                                                        "fields": {"Name": name}, 
                                                        "inputs": {
                                                            "pos": {
                                                                "shadow": {
                                                                    "type": "get_VAR", 
                                                                    "fields": {"Name": "i"}
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }, 
                                            "next": {
                                                "shadow":{
                                                    "type": "compare_block_", 
                                                    "inputs": {
                                                        "A": {
                                                            "shadow": {
                                                                "type": "array_operate[]", 
                                                                "fields": {"Name": name}, 
                                                                "inputs": {
                                                                    "pos": {
                                                                        "shadow": {
                                                                            "type": "get_VAR", 
                                                                            "fields": {"Name": "j"}
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }, 
                                                        "B": {
                                                            "shadow": {
                                                                "type": "array_operate[]", 
                                                                "fields": {"Name": name}, 
                                                                "inputs": {
                                                                    "pos": {
                                                                        "shadow": {
                                                                            "type": "get_VAR", 
                                                                            "fields": {"Name": "i"}
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }, 
                                                    "next": {
                                                        "shadow":{
                                                            "type": "compare_block_", 
                                                            "inputs": {
                                                                "A": {
                                                                    "shadow": {
                                                                        "type": "array_operate[]", 
                                                                        "fields": {"Name": name}, 
                                                                        "inputs": {
                                                                            "pos": {
                                                                                "shadow": {
                                                                                    "type": "get_VAR", 
                                                                                    "fields": {"Name": "j"}
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }, 
                                                                "B": {
                                                                    "shadow": {
                                                                        "type": "get_VAR", 
                                                                        "fields": {"Name": "tmp"}
                                                                    }
                                                                }
                                                            }
                                                        } 
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};