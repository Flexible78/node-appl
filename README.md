# Task Definition: spliting code and comments
## CLI application getting following posional arguments
### First argument (mandatory) - path of file with code and comments
### Second argument (mandatory) - path of file with only code
### third argument (mandatory) - path of file with only comments
# Assumptions:
1. Only line comments are assumed<br>
2. Not considered complecated cases like const a = "anb//df"
# Example:
//variable abc<br>
const abc: number = 10<br>
const lmn: number = 20 //variable lmn <br>
## Result 
file with only code will contain: <br>
const abc: number = 10<br>
const lmn: number = 20  <br>
<br>
file with only comments will contain: <br>
//variable abc<br>
      //variable lmn


