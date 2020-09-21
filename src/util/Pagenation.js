import React, { useState, useEffect } from "react"
import { pathExists } from "fs-extra"

const Pagenation = ({ data, fn }) => {
  const [per, setPer] = useState(10)
  // pagination initialState
  const [arr, setArr] = useState([])
  const [page, setPage] = useState({
    start: 0,
    end: 10,
    current: 1
  })

  // pagination test 를 위한 + 50
  const total = Math.ceil(data.count / per)
  const array = []
  for (let i = 0; i < total; i++) {
    array.push(i + 1)
  }

  useEffect(() => {
    setArr(array.slice(page.start, page.end))
  }, [per])

  // pagination ++
  const onPageUp = () => {
    // if (page.current < arr[arr.length - 1]) {
    //   fn(page.current)
    //   setPage({ ...page, current: page.current + 1 })
    // } else if (page.current % page.end === 0 && page.end < total) {
    //   fn(page.current + 1)
    //   setPage({
    //     start: page.start + 1,
    //     end: page.end + 1,
    //     current: page.current + 1
    //   })
    //   setArr(array.slice(page.start + 1, page.end + 1))
    // }
    const lastIndex = array.length

    if (lastIndex <= 10 && page.current <= 10) {
      if (page.current < lastIndex) {
        setPage({ ...page, current: page.current + 1 })
        fn(page.current + 1)
      }
    } else {
      const maxIndex = array[page.current]
      if (maxIndex) {
        setPage({ ...page, current: maxIndex })
      } else {
        setPage({ ...page, current: lastIndex - 1 })
      }
    }
  }

  const tenPageUP = () => {
    const lastIndex = array.length
    if (lastIndex <= 10 && page.current <= 10) {
      setPage({ ...page, current: lastIndex })
      fn(lastIndex)
    } else {
      const maxIndex = array[page.current + 9]
      if (maxIndex) {
        setPage({ ...page, current: maxIndex })
        fn(maxIndex)
      } else {
        setPage({ ...page, current: lastIndex })
        fn(lastIndex)
      }
    }
  }

  // 음수를 체크 하고  조건에 맞을때 무조건 1페이지로 보내는 변수
  // 마이너스 체크에 클릭된페이지가 담겨있고 Math.sign으로 음수체크
  const tenPageDown = () => {
    const minusCheck = page.current - 10
    if (Math.sign(minusCheck) <= 0) {
      setPage({ ...page, current: 1 })
      fn(1)
    } else {
      setPage({ ...page, current: minusCheck })
      fn(minusCheck)
    }
  }
  // pagination --
  const onPageDown = () => {
    // if (page.current > arr[0]) {
    //   fn(page.current - 1)
    //   setPage({ ...page, current: page.current - 1 })
    // } else if (page.current % arr[0] === 0 && page.start >= 1) {
    //   setPage({
    //     start: page.start - 1,
    //     end: page.end - 1,
    //     current: page.current - 1
    //   })
    //   setArr(array.slice(page.start - 1, page.end - 1))
    // }
    // console.log(page.current)
    const minusCheck = page.current - 1
    if (Math.sign(minusCheck) <= 0) {
      setPage({ ...page, current: 1 })
    } else {
      setPage({ ...page, current: minusCheck })
    }
    fn(page.current - 1)
  }

  return (
    <>
      {/* <!-- [D] 리스트 8개 이상 부터 페이지네이션 기능 추가 --> */}
      <div className="withing-pagenation">
        {/* <!-- [D] only for pc : 10페이지 단위로 이동, 처음 페이지 일 경우 및 미노출시 is-disabled 클래스명 추가 및 disabled 추가 --> */}
        <button
          type="button"
          className="withing-pagenation__cta btn-prev2"
          onClick={tenPageDown}
        >
          <span className="blind">10페이지 전으로 이동</span>
        </button>
        <button
          type="button"
          className="withing-pagenation__cta btn-prev"
          onClick={onPageDown}
        >
          <span className="blind">이전 페이지로 이동</span>
        </button>
        <div className="withing-pagenation__link">
          {/* <!-- [D] 선택된 경우 is-active 클래스명 추가 --> */}
          {array.map(a => (
            <a
              key={a}
              // href="#"
              style={{ padding: "11px 5px" }}
              className={`page-link ${page.current === a ? "is-active" : ""}`}
              onClick={() => {
                setPage({ ...page, current: a })
                fn(a)
                console.log(a)
              }}
            >
              <span class="num">{a}</span>
            </a>
          ))}
        </div>
        <button
          type="button"
          className="withing-pagenation__cta btn-next"
          onClick={onPageUp}
        >
          <span className="blind">다음 페이지로 이동</span>
        </button>
        {/* /* <!— [D] only for pc : 10페이지 단위로 이동, 마지막 페이지 일 경우 및 미노출시 is-disabled 클래스명 추가 —> */}
        <button
          type="button"
          className="withing-pagenation__cta btn-next2"
          onClick={tenPageUP}
        >
          <span className="blind">10페이지 다음으로 이동</span>
        </button>
      </div>
    </>
  )
}

export default Pagenation
