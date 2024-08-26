---

title: Inputs and Outputs in Python, Java and Pseudocode
description: 'On this post, syntax differences on three main programming languages will be shown as to be a starting point to new students.'
publishDate: 26 August 2024
tags: ["IB", "IGCSE", "Paper 2", "Option D IB"]
draft: false
ogImage: public/social-card.png

---

In this one, multiple differences in the main structures will be specified for educational purposes. Each structure will present JAVA, PYTHON and PSEUDOCODE syntax that allows to determine the essential differences. Remember that the most important element in coding has to do with learning the concepts rather than the structure since it's widely applied to all main programming languages.



### Python
Python offers a simple syntax where a variable can store a value directly from an input and the declaration of the variable can happen in the same line where it's assigned a value. To achieve so, you need to use the command ```input```. This function receives by default a string type. Hence, that's why there is no need to add ```str``` before it. For the other data types, it's mandatory to use the corresponding function to convert them.

Use ```int``` for converting strings to integers and ```float``` to convert them to real numbers.

In case of creating an OUTPUT, use the functio **print()** to show it to the console.

```py  title="Python" wrap
var_name = input("This reads an string from the user.")
num_name = int(input("This reads an integer."))
real_name = float(input("This reads a real number."))

#Built for output messages
print("This is a test that outputs the values of the variables", var_name, num_name, real_name )

```

### Java

Whent it comes to Java, it's essential to note that this programming language uses multiple modules and built-in classes to achieve different taks. In this case,the ```Scanner``` from ```Util``` that contains many utilities for the language is imported into the ```main``` class.

Java uses a declaration that may be in a single line or in multiple as needed. To do so, you need to specify the data type, then the variable's indetifier and the assigned value. However, it can be also created first the declaration process by data type and name that can be called lines later.

For java, you may also specify the method of the ```scanner``` class according to the data type you want to read. Some examples are nextLine(), nextBoolean(), nextFloat(), nextInt().

You have to use **```println()```** to show a message on the console.

```java title="Java" wrap
import java.util.Scanner;

public class InputExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("This reads a string from the user: ");
        String varName = scanner.nextLine();

        System.out.print("This reads an integer: ");
        int numName = scanner.nextInt();

        System.out.print("This reads a real number: ");
        double realName = scanner.nextDouble();

        System.out.println("This is a test that outputs the values of the variables: " + varName + ", " + numName + ", " + realName);
    }
}
```

### Pseudocode

Pseudocode, in any of their IB or IGCSE variations, follow a Java-like structure. It's relevant to note that any KEYWORD should be capitalized accrodingly. For the variable naming process, we shall follow a structure where the first letter of the second word shall be capitalized (i.e. **nameVariable**). Additionally, we use a output first then input later structure that ensures that, as in Java, the message uses a different line than the input assignation process.

```python title ="Pseudocode" wrap
DECLARE varName STRING
DECLARE numName INTEGER
DECLARE realName REAL

OUTPUT "This reads a string from the user: "
INPUT varName
OUTPUT "This reads an integer: "
INPUT numName
OUTPUT "This reads a real number: "
INPUT realName

OUTPUT "This is a test that outputs the values of the variables: " + varName + ", " + numName + ", " + realName
```
