
//Pathes - interface defining object type containing all required file path values
// getPathes - function returning object of type Pathes with all required file path values
// getCodeWithComments - function returning lines from the input file as an array of strings
   //getting array of strings separated by new line symbol
// CodeComments - interface defining type with code and comments
// codeCommentsSeparation - function returning object with code and comments fields
// reducer - callback for reducing in the function codeCommentsSeparation
   //additional condition for avoiding "//" in the example code inside indexOf("//")
   //line contains only code
   //line contains comments
   //line contains both code and comments
// main - integration controller function
   //1 - getting all file path values
   //2 - logging at level "debug" arguments of the command line
   //3 - getting code with comments
   //4 - getting object with separated code and comments
   //5 - writing code and comments to appropriate files
   //6 - logging finishing of savings at level "info"
   //7 - logging an error
   //simmultanious writing to code and comments files