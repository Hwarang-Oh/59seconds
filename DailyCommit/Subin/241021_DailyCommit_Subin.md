**프로세스** 

- 프로그램이 실제 메모리에 코드가 실행된 상태
- 프로그램의 하나의 인스턴스가 프로세스
- 프로그램은 하나지만, 같은 프로세스가 여러 개가 될 수 있다.

> ✅ 이해가 안된다면 우리가 만든 프로그램이 클래스, 실행을 시킨게 객체라고 생각해봐! 


## Thread

- 프로세스 내에서 실행되는 흐름의 단위
- CPU는 한 번에 하나의 명령 수행
- 프로세스는 반드시 1개 이상 스레드를 가진다 (Main)

### Multi Thread의 필요성

10개의 요청이 동시간대에 이루어진다면?

- 하나의 쓰레드가 공유 자원을 접근할 시 반드시 `lock (mutex, semaphore 등..)`
- 특수한 상황으로 인해 unlock이 되지 않으면 `deadlock` 발생한다.

✅**DeadLock**
2개 이상의 작업이 서로 상대방의 작업이 끝나기 만을 기다리고 있기 때문에 결과적으로 아무것도 완료되지 못하는 상태이다


**공유 자원이 생기는 경우 반드시 lock과 같은 메모리 보호 기능을 사용해야 한다.**