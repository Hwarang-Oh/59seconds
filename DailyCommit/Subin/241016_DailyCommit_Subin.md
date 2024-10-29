# Kotlin

# Java

long number1 = 10L; 
final long number2 = 10L; 

# Kotlin
var number1: Long = 10L 
val number2 = 10L 
모든 변수는 우선 val 로 선언하는 것을 추천한다.
꼭 필요한 경우. 즉, 값이 변해야 하는 경우에만 var 로 선언한다.

💡 Key Point
1. val : value 값 자체를 의미한다. 변하지 않는다.
2. var : variable 변할 수 있는 값 즉, 변수를 의미한다.

# Java
Long number3 = 1_000L;
# Kotlin
var number3: Long? = 1_000L
💡 Key Point
1. 코틀린에서는 Primitive Type 과 Reference Type 차이가 없다.
2. 자바의 Reference Type 은 null 이 들어갈 수 있으므로 Kotlin 에서는 타입에 ? 를 붙여주었다.
- null 은 다음 챕터에서 더 다뤄보자.


# Java
Person person = new Person("Joshua"); 
# Kotlin
var person = Person("Joshua")
💡 Key Point
1. 코틀린에서는 객체를 인스턴스화 할 때 new 를 사용하지 않는다.
- 개인적으로는 이게 아직 어색하더라 .. new 쓰고 다시 지우곤 한다 ㅎ


ITEM 2. null
Safe Call 과 Elvis 연산자
Safe Call
말 그대로 안전하게 불러오는 것을 의미함
?. 을 통해 null 이 들어올 수 있는 값이 npe 터지지 않도록 함.
null 이라면 null 그대로를 반환한다.
# kotlin - safe call 예시
val str1: String? = "ABC"
val str2: String? = null
println(str1?.length) //-> 3
println(str2?.length) //-> null
Elvis 연산자
앞의 연산 결과가 null 이면 Elvis 연산자 뒤의 값을 사용한다.
?: 형태
왜 Elvis 냐? 저걸 시계방향으로 돌리면 꼬브랑 머리가 엘비스 프레슬리 같다고 ..ㅎ..
# kotlin - Elvis 연산자 예시
val nullValueUsingSafeCall: Int? = safeCallMethod(null)
println(nullValueUsingSafeCall?.dec() ?: 10) // '?:' 요게 Elvis 연산자

Safe Call 과 Elvis 연산자를 활용하여 Java -> Kotlin
# java
public boolean startsWithA1(String str) {
    if (str == null) {
      throw new IllegalArgumentException("null이 들어왔습니다");
    }
    return str.startsWith("A");
  }


public Boolean startsWithA2(String str) {
    if (str == null) {
      return null;
    }
    return str.startsWith("A");
  }


public boolean startsWithA3(String str) {
    if (str == null) {
      return false;
    }
    return str.startsWith("A");
  }
# kotlin
fun startsWithA1 (str: String?): Boolean{
    return str?.startsWith("A") ?: throw IllegalArgumentException("null 이 들어왔습니다.")
}

fun startWithA2 (str: String?): Boolean? {
    return str?.startsWith("A")
}

fun startWithA3 (str: String?): Boolean {
    return str?.startsWith("A") ?: false
}
직관적이면서도 간결하다. 만세 !

null 을 안전하게 다루는 Kotlin
fun startWithA4 (str: String): Boolean {
    return str.startsWith("A")
}
str 이 String 타입이므로 (String? 타입이 아니므로) null 이 들어가지 않는다고 코틀린이 간주한다.
그러므로 startsWith() 메서드 콜이 바로 가능하다.

fun safeCallMethod (str: String?): Int? {
    return str?.length
}
str 은 String? 타입이므로 null 이 들어갈 수 있다.
이 경우 메서드 콜을 위해 safe call 을 한다.
str?.length 는 str 이 null 이 아니면 실행하고, null 이면 실행자체를 하지 않고 null 을 반환한다.
💡 Key Point
1. 코틀린은 null 이 가능한 타입(?가 붙은 타입)을 다른 타입으로 취급한다.
2. 언어 단에서 null 을 안전하게 다뤄준다는 것만으로도 코틀린을 써야할 이유가 충분하다. ㅎ..


nullable 이지만, 절대 null 일 수 없는 경우
이런 경우는 어떤 경우일까? 🤔

DB 에 처음 데이터가 들어올 때는 null 일 수 있어서 nullable 이지만,
한번 어떠한 비지니스 로직을 통해 해당 데이터가 업데이트 되면 그 이후로는 절대 null 이 아닌 경우

fun neverNullValue (str: String?): Boolean {
    return str!!.startsWith("A") 
}
절대 null 이 아니야!! 그러니까 startWith() 메서드를 실행해줘!!!!
💡 Key Point
1. 절대 null 이 아니다!! 라고 소리친다고 이해하면 좋음
2. 개인적으로는 이 방법이 썩 좋은 방법 같지는 않다. (어떤일이 터질지 모르니까.. 프로그래밍 세계는 절대적인게 없거든. 웬만하면 안써야겠다.)


ITEM 3. Type
타입 캐스팅과 (개쩌는) 스마트 캐스팅
# java
public void printAgeIfPerson(Object obj) {
    if (obj instanceof Person) {
      Person person = (Person) obj;
      System.out.println(person.getAge());
    }
  }
version 1

# kotlin
fun printAgeIfPerson (obj: Any) {
    if (obj is Person) { 
        val person = obj as Person
        println(person.age)
    }
instanceof 는 is 로 사용된다.
java 에서 캐스팅을 위한 (Person) 은 as 를 사용하며, 생략이 가능하다.
version 2

fun printAgeIfPerson (obj: Any) {
    if (obj is Person) { 
        println(obj.age) 
    }
개쩌는 스마트 캐스팅 🫢
코틀린이 if 절을 컴파일에서 이미 이해하고, obj 가 Person 타입인것을 인지하여 age 메서드 콜이 가능하다.
version 3

fun printAgeIfPerson (obj: Any) {
	val person: Person? = obj as? Person 
    println(person?.age)
}
안전한 캐스팅
Person 에 null 이 들어올 수 있을 때, nullable 로 선언이 가능하다.
이 타입이 아닌경우에도 castException 이 아니라 null 이 반환된다.
💡 Key Point
1. instanceof -> is
2. 캐스팅은 as 로 사용하며, 생략이 가능.
3. 코틀린은 스마트 캐스팅이 가능하다.


Kotlin 의 특이한 타입 3가지
Any
Java 의 Object 역할. 즉, 모든 객체의 최상위 타입
Any 자체로는 null 을 포함하지 않는다.
- null 포함하려면 Any? 로 표현해야한다. ㅎ
Any 에 equals, hashCode, toString 이 존재한다
Unit
Java 의 void 와 동일한 역할
하나 다른 점은, unit 은 그 자체로 타입 인자로 사용 가능하다.
이게 무슨말이냐면 코틀린의 unit 은 실제 존재하는 타입이라는 것! (Java 의 void 는 타입이 없었..)
Nothing
함수가 정상적으로 끝나지 않았다는 사실을 표현할 때 쓰인다.
'무조건 예외를 반환하는 함수', '무한루프 함수' 등..
실무에서는 잘 안쓰인다.

ITEM 4. 연산자
연산자 공부를 위해 만들어진 Money 클래스
# java

public class JavaMoney implements Comparable<JavaMoney> {

  private final long amount;

  public JavaMoney(long amount) {
    this.amount = amount;
  }

  public JavaMoney plus(JavaMoney other) {
    return new JavaMoney(this.amount + other.amount);
  }

  @Override
  public int compareTo(@NotNull JavaMoney o) {
    return Long.compare(this.amount, o.amount);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    JavaMoney javaMoney = (JavaMoney) o;
    return amount == javaMoney.amount;
  }

  @Override
  public int hashCode() {
    return Objects.hash(amount);
  }

  @Override
  public String toString() {
    return "JavaMoney{" +
        "amount=" + amount +
        '}';
  }

}
# kotlin

data class Money (
    val amount: Long
) {

    operator fun plus(other: Money): Money {
        return Money(this.amount + other.amount)
    }
}
💡 Key Point
1. 위랑 아래 코드 진짜 똑같은 코드가 맞다. 놀라울따름 ㅎ..
2. 해당 내용은 클래스 부분에서 다시 더 자세하게 다루겠다.


비교 연산자
# java

JavaMoney money1 = new JavaMoney(10_000L);
JavaMoney money2 = new JavaMoney(2_000L);

if (money1.compareTo(money2) > 0) {
      System.out.println("Money1 이 Money2 보다 금액이 큽니다.");
 }
# kotlin

val money1 = JavaMoney(10_000L)
val money2 = JavaMoney(2_000L)

if (money1 > money2) {
        println("Money1 이 Money2 보다 금액이 큽니다.")
    }
객체를 비교할 때, 비교연산자 (>,<, >=, <=) 를 사용하면 자동으로 compareTo 를 호출한다.
코틀린은 클래스를 생성할 때 자동으로 compareTo 메서드를 만들어 주기 때문에 위의 코드에서 보이지 않는다.

동등성과 동일성
동등성 : '두 객체의 값이 같은가'

Java : equals() 로 비교
Kotlin : == 로 비교
동일성 : '완전히 동일한 객체인가' 즉, '주소' 값이 같은가

Java : == 로 비교
Kotlin : === 로 비교

# java
JavaMoney money3 = money1;
JavaMoney money4 = new JavaMoney(1_000L);

System.out.println(money1 == money3); // true
System.out.println(money1.equals(money4)); // true 
money1 와 money3 은 주소 값이 같은 동일한 객체다. (==)
compareTo() 가 구현되어 있다면, money1 과 money4 는 equals() 즉, 값이 같은 동등한 객체다
좀 헷갈림..

# kotlin

val money3 = money1
val money4 = JavaMoney(2_000L)

println(money1 === money3)
println(money1 == money4)
보다 직관적이다.
= 이 하나 더 붙으면 '주소까지 같은지 완전 비교하자!' 라는 의미로 이해하면 좋다.

연산자 오버로딩
코틀린에서는 객체마다 연산자를 직접 정의할 수 있다.
operator 키워드를 통해 가능하다.
# Money.kt

data class Money (
    val amount: Long
) {

    operator fun plus(other: Money): Money {
        return Money(this.amount + other.amount)
    }
}
위에도 써놓은 Money 클래스다.
operator 키워드를 통해 연산자를 직접 정의했다.
이 부분도 매우 신기한데, 정해진 연산자 네이밍 메서드를 마음대로 커스텀하여 만들 수 있다.
 val kMoney1 = Money(1_000L)
 val kMoney2 = Money(2_000L)
 println(kMoney1 + kMoney2) // 3_000
plus 라는 연산자를 오버로딩 하면, + 로 객체끼리 연산을 하게 되면 정의한 대로 연산이 된다.
개.쩐.다 🫢
💡 Key Point
1. operator 연산자를 정해진 연산자 메서드 네이밍에 맞춰 커스텀할 수 있다.
2. 사용할 때, 해당 연산자를 사용하면 오버로딩된 연산이 가능하다. (+ -> plus)


ITEM 5. 제어문
if
# java

private void validateScoreIsNotNegative(int score) {
    if (score < 0) {
      throw new IllegalArgumentException(String.format("%s는 0보다 작을 수 없습니다", score));
    }
  }
# kotlin

fun validateScoreIsNotNegative(score: Int) {
    if (score < 0) {
        throw IllegalArgumentException("${score} 는 0보다 작을 수 없습니다.")
    }
}
위의 코드는 사실 별다를게 없다.
if-else
Statement vs Expression

Statement : 프로그램의 문장. 하나의 값으로 도출되지 않는다. 즉, return 값으로 사용 불가.
Expression : 하나의 값으로 도출되는 문장. (Java 에서는 3항 연산자 같은 것)
# java

  private String getPassOrFail (int score) {
    if (score >= 50) {
      return "P";
    } else {
      return "F";
    }
  }
# kotlin

fun getPassOrFail (score: Int): String {
    return if (score >= 50) {
            "P"
        } else {
            "F"
        }
}
💡 Key Point
1. 코틀린에서 if-else 문은 Expression 이다.
2. 코틀린에서는 if-else 가 Expression 이므로 3항연산자가 없다. 사실 쓸 필요가 없음..ㅎ


# java

  private String getGrade (int score) {
    if (score >= 90) {
      return "A";
    } else if (score >= 80) {
      return "B";
    } else if (score >= 70) {
      return "C";
    } else {
      return "D";
    }
  }
  
# kotlin

fun getGrade (score: Int): String {
    val calculatedScore: String = if (score >= 90) {
        "A"
    } else if (score >= 80) {
        "B"
    } else if (score >= 70) {
        "C"
    } else {
        "D"
    }
    return calculatedScore
}

코틀린에서는 if-else 가 Expression 이므로 변수로도 할당이 가능하다. 🫢