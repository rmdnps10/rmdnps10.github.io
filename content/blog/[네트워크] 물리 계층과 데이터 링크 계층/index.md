---
title: "[네트워크] 물리 계층과 데이터 링크 계층 - 이더넷과 네트워크 장비"
date: 2026-02-13
slug: physical-and-data-link-layer
description: 물리 계층과 데이터 링크 계층의 핵심 기술인 이더넷, 통신 매체, 네트워크 장비의 동작 원리를 정리합니다.
thumbnail: ./index.png
pointColor: "#ffffff"
tags: ["네트워크"]
keywords: "이더넷, 물리 계층, 데이터 링크 계층, MAC 주소, 프레임, 트위스티드 페어 케이블, WiFi, NIC, 스위치, 허브, VLAN"
---

> `혼자 공부하는 네트워크` 책을 읽으면서 배운 점을 정리합니다.
> 네트워크의 가장 하위 계층인 물리 계층과 데이터 링크 계층은 실제 데이터 전송의 기반이 된다. LAN 내에서 호스트들이 올바르게 정보를 주고받기 위한 이더넷 기술과 다양한 네트워크 하드웨어의 동작 원리에 대해 정리한다.

![](./index.png)

## 1️⃣ Ethernet 기술

### Ethernet의 개념

`Ethernet`은 물리 계층과 데이터 링크 계층에서 LAN 내의 호스트들이 정보를 주고받을 수 있게 해주는 기술이다. 통신 매체를 통해 신호를 송수신하는 방법, 데이터 링크 계층에서 주고받는 `Frame`의 형식 등이 정의되어 있다. 현대 대부분의 **유선 LAN**은 Ethernet을 기반으로 구현되어 있다.

#### 1-1 Ethernet 표준 (IEEE 802.3)

Ethernet은 `IEEE 802.3`이라는 이름으로 국제 표준화되어 있다. 서로 다른 제조사의 네트워크 장비가 문제없이 호환되는 이유는 모두 동일한 표준을 준수하기 때문이다.

| 표준           | 명칭                 | 속도    |
| -------------- | -------------------- | ------- |
| IEEE 802.3     | Ethernet             | 10Mbps  |
| IEEE 802.3u    | Fast Ethernet        | 100Mbps |
| IEEE 802.3z/ab | Gigabit Ethernet     | 1Gbps   |
| IEEE 802.3ae   | 10 Gigabit Ethernet  | 10Gbps  |
| IEEE 802.3ba   | 100 Gigabit Ethernet | 100Gbps |

**Ethernet 표준에 대해 기억해야 할 핵심**

- 오늘날 대부분의 유선 LAN 장비는 특정 Ethernet 표준을 따른다
- Ethernet 표준에 따라 통신 매체의 종류, 신호 송수신 방법, 최대 지원 속도가 달라진다

#### 1-2 Ethernet Frame

`Ethernet Frame`은 Ethernet 기반 네트워크에서 주고받는 데이터 단위다. 오늘날 주로 사용되는 Ethernet Frame은 `Ethernet II Frame`이라고도 부른다.

**Frame의 구조**

| 헤더                                                          | 페이로드        | 트레일러 |
| ------------------------------------------------------------- | --------------- | -------- |
| Preamble(8B), 수신지 MAC(6B), 송신지 MAC(6B), Type/Length(2B) | Data (46~1500B) | FCS (4B) |

##### Preamble

`Preamble`은 송수신지 동기화를 위한 8바이트 크기의 정보다.

- 첫 7바이트: `10101010`
- 마지막 바이트: `10101011`

수신지는 이 비트 패턴을 통해 Ethernet Frame이 수신되고 있음을 인식한다.

##### 송수신지 MAC 주소

`MAC Address`는 Frame에서 가장 중요한 정보다. 6바이트(48비트) 길이로, 콜론(`:`)으로 구분된 12자리 16진수로 표현된다.

```java
// MAC 주소 예시
ab:cd:ab:cd:00:01

> 💡 MAC 주소와 네트워크 인터페이스
> MAC Address는 물리적 주소라고도 불리며, 네트워크 >인터페이스마다 하나씩 부여된다. 네트워크 인터페이스는 네트워크를 향하는 통로로, 일반적으로 NIC(Network Interface Controller)가 담당한다. 따라서 NIC가 여러 개인 경우 한 호스트가 여러 개의 MAC 주소를 가질 수 있다.
```

> 💡 MAC 주소와 네트워크 인터페이스
>
> `MAC Address`는 **물리적 주소**라고도 불리며, 네트워크 인터페이스마다 하나씩 부여된다. 네트워크 인터페이스는 네트워크를 향하는 통로로, 일반적으로 `NIC(Network Interface Controller)`가 담당한다. 따라서 NIC가 여러 개인 경우 한 호스트가 여러 개의 MAC 주소를 가질 수 있다.

##### Type/Length

`Type/Length` 필드는 값의 크기에 따라 의미가 달라진다.

- **1500 이하** (0x05DC): Frame의 크기
- **1536 이상** (0x0600): 캡슐화된 상위 계층 프로토콜 타입
  - IPv4: `0x0800`
  - ARP: `0x0806`

##### Data

`Data` 필드에는 상위 계층으로 전달할 페이로드가 포함된다. **최대 크기는 1500바이트**로 제한되며, 이를 초과하는 데이터는 여러 패킷으로 나뉘어 전송된다.

> 💡 MTU (Maximum Transmission Unit)
>
> **1500바이트**는 Ethernet Frame으로 전송 가능한 최대 데이터 크기이자, 네트워크 계층 패킷의 최대 크기를 나타내는 중요한 기준이다. 이를 `MTU`라고 한다.

##### FCS (Frame Check Sequence)

`FCS`는 트레일러로, Frame의 오류 검출을 위한 필드다. `CRC(Cyclic Redundancy Check)` 값이 명시된다.

- 송신지: 데이터에 대한 CRC 값을 계산하여 전송
- 수신지: 수신한 데이터의 CRC 값을 계산하고 전달받은 값과 비교
- 두 값이 일치하면 오류가 없다고 판단

## 2️⃣ 통신 매체

통신 매체는 네트워크 성능의 기본이 된다. 호스트가 아무리 빠르게 데이터를 처리할 수 있어도, 통신 매체의 성능이 뒷받침되지 않으면 전체 네트워크 속도는 제한된다.

### 유선 매체

#### 2-1 Twisted Pair Cable

`Twisted Pair Cable`은 가장 대표적인 유선 매체다. 구리선을 통해 전기적으로 신호를 주고받으며, 두 가닥(pair)씩 꼬아져 있는(twisted) 구조를 가진다.

##### Category

트위스티드 페어 케이블의 성능은 `Category`로 구분된다.

| Category | 전송 속도 |
| -------- | --------- |
| Cat5     | 100Mbps   |
| Cat5e    | 1Gbps     |
| Cat6     | 1Gbps     |
| Cat6a    | 10Gbps    |
| Cat7     | 10Gbps    |
| Cat8     | 40Gbps    |

##### Shielding (차폐)

트위스티드 페어 케이블은 전기 신호로 통신하기 때문에 `Noise`에 취약하다. 이를 방지하기 위해 케이블을 철사나 포일로 감싼다.

**실드 표기법: [외부]/[내부]TP**

- U: 실드 없음 (Unshielded)
- S: 브레이드 실드 (Braided Shield)
- F: 포일 실드 (Foil Shield)

```
// 실드 타입 예시
- S/FTP: 외부는 브레이드 실드, 내부 구리선은 포일 실드
- F/FTP: 외부와 내부 모두 포일 실드
- U/UTP: 실드 없음
```

**케이블 종류**

- `STP (Shielded Twisted Pair)`: 브레이드 실드 사용
- `FTP (Foil Twisted Pair)`: 포일 실드 사용
- `UTP (Unshielded Twisted Pair)`: 실드 미사용

### 무선 매체

#### 2-2 전파와 WiFi

`전파`는 약 3kHz~3THz 사이의 진동수를 갖는 전자기파다. 무선 LAN에서 가장 대중적으로 사용되는 기술은 `WiFi`로, `IEEE 802.11` 표준을 따른다.

##### WiFi 세대

| 세대    | 표준 규격     |
| ------- | ------------- |
| Wi-Fi 7 | IEEE 802.11be |
| Wi-Fi 6 | IEEE 802.11ax |
| Wi-Fi 5 | IEEE 802.11ac |
| Wi-Fi 4 | IEEE 802.11n  |

##### 주파수 대역과 채널

WiFi는 주로 **2.4GHz**와 **5GHz** 주파수 대역을 사용한다. 같은 주파수 대역에서 여러 무선 네트워크가 존재할 수 있으므로, 신호 간섭을 방지하기 위해 `Channel`이라는 하위 주파수 대역으로 세분화된다.

**2.4GHz 대역의 비중첩 채널**

- 1, 6, 11번 채널은 서로 주파수가 중첩되지 않음
- 비중첩 채널을 사용하면 신호 간섭으로 인한 성능 저하를 방지할 수 있음

> 💡 AP와 SSID
>
> `AP(Access Point)`는 무선 통신 기기를 연결해 무선 네트워크를 구성하는 장비다. 일반적인 무선 공유기가 AP의 역할을 담당한다. AP를 중심으로 구성된 무선 네트워크를 `Service Set`이라고 하며, 이를 식별하는 정보가 `SSID(Service Set Identifier)`다. 흔히 WiFi 이름으로 사용되는 것이 바로 SSID다.

## 3️⃣ 네트워크 장비

### NIC (Network Interface Controller)

#### 3-1 NIC의 역할

네트워크 상에서 노드와 통신 매체가 연결되는 지점을 `Network Interface`라고 한다. `NIC`는 네트워크 인터페이스를 담당하는 하드웨어로, 다음과 같은 별칭으로도 불린다.

- 네트워크 인터페이스 카드
- 네트워크 어댑터
- LAN 카드
- Ethernet 카드

**NIC의 기능**

- 통신 매체의 신호를 호스트가 이해하는 Frame으로 변환
- 호스트의 Frame을 통신 매체의 신호로 변환
- MAC 주소를 기반으로 잘못 전송된 패킷 확인

#### 3-2 NIC의 동작 방식

NIC는 일반적인 입출력 장치와 동일하게 동작한다.

```java
// NIC 동작 과정
1. 사용자 프로그램에서 송수신 시스템 콜 호출
2. 커널 모드로 전환
3. NIC를 통한 송수신 수행 (DMA 지원)
4. 완료 시 인터럽트를 통해 CPU에 알림
```

> 💡 NIC Teaming/Bonding
>
> 여러 물리적 NIC를 하나의 고속 NIC처럼 구성하는 기술이다.
>
> - `Teaming`: Windows 운영체제 용어
> - `Bonding`: Linux 운영체제 용어
>
> RAID와 유사하게 여러 NIC를 묶어 **송수신 성능을 향상**시키고, 하나의 NIC에 문제가 발생해도 **안정적으로 통신**할 수 있다.

### Hub와 Switch

#### 3-3 Hub (물리 계층)

`Hub`는 물리 계층의 대표적인 네트워크 장비로, 여러 호스트를 연결하는 장치다. `Repeater Hub` 또는 `Ethernet Hub`라고도 부른다.

**Hub의 특징**

1. **전달받은 신호를 모든 포트로 내보냄**

   - 신호에 대한 어떠한 조작이나 판단도 하지 않음
   - 단순히 모든 포트에 신호를 복제

2. **반이중(Half-Duplex) 모드로 통신**
   - 송신과 수신을 동시에 수행할 수 없음
   - 무전기처럼 한 쪽이 송신할 때 다른 쪽은 수신만 가능

> 💡 Collision Domain (충돌 도메인)
>
> `Collision`은 여러 호스트가 동시에 Hub로 메시지를 전송할 때 발생하는 문제다. Hub는 반이중 모드로 통신하므로, Hub에 연결된 **모든 호스트가 하나의 Collision Domain**을 형성한다.

#### 3-4 Switch (데이터 링크 계층)

`Switch`는 Hub의 한계를 보완하기 위한 네트워크 장비다. `L2 Switch`라고도 부른다.

##### Switch의 특징

- 목적지 포트로만 신호 전달을 통해 불필요한 트래픽 감소
- 동시 송수신 가능
- 전화기처럼 양방향 통신 가능
- 각 포트가 독립적인 Collision Domain 형성

##### MAC Address Learning

Switch가 목적지 포트를 파악할 수 있는 이유는 `MAC Address Learning` 기능 때문이다.

```java
// MAC 주소 학습 과정
1. 수신한 Frame의 송신지 MAC 주소 확인
2. "포트 번호 - MAC 주소" 매핑 정보 저장
3. MAC Address Table 생성
4. 이후 해당 MAC 주소로 전송 시 테이블 참조
```

**MAC Address Table 예시**

| Port | MAC Address       |
| ---- | ----------------- |
| 1    | aa:bb:cc:dd:ee:01 |
| 2    | aa:bb:cc:dd:ee:02 |
| 3    | aa:bb:cc:dd:ee:03 |

##### VLAN (Virtual LAN)

`VLAN`은 같은 Switch에 연결된 호스트를 여러 논리적 네트워크로 분리하는 기능이다.

**VLAN의 효과**

- 같은 물리적 Switch 내에서 복수의 논리적 네트워크 구성
- 서로 다른 VLAN 간 Broadcast Domain 분리
- VLAN 간 통신은 네트워크 계층 이상의 장비 필요

```java
// VLAN 구성 예시
VLAN 1: Host A, B, C, D
VLAN 2: Host E, F, G, H, I

// VLAN 1의 브로드캐스트는 VLAN 2에 도달하지 않음
// 서로 다른 VLAN 간 통신은 L3 장비(라우터) 필요
```

## 4️⃣ 전이중 vs 반이중 통신

### 통신 모드의 이해

| 모드          | 설명                      | 비유   | 대표 장비 |
| ------------- | ------------------------- | ------ | --------- |
| `Half-Duplex` | 송신과 수신을 번갈아 수행 | 무전기 | Hub       |
| `Full-Duplex` | 동시 송수신 가능          | 전화기 | Switch    |

**Half-Duplex의 문제점**

- 한 번에 하나의 호스트만 전송 가능
- 동시 전송 시 충돌 발생
- 전체 네트워크 성능 저하

**Full-Duplex의 장점**

- 동시 양방향 통신으로 효율성 향상
- Collision 문제 해결
- 높은 처리량(Throughput) 달성
