import React, { useState, useEffect } from "react"
import { pathExists } from "fs-extra"

const ReviewBox = props => {
  // const [testData, setTestData] = useState([])

  //페이지 개수
  const [per, setPer] = useState(5)
  const [arr, setArr] = useState([])
  // 실제 페이지네이션을 쪼개서 뿌려주는 리스트
  const [list, setList] = useState([])

  const [page, setPage] = useState({
    start: 0,
    end: 10,
    current: 1
  })

  const pageBlock = Math.ceil(props.reviewList.length / per)
  const array = []
  for (let i = 0; i < pageBlock; i++) {
    array.push(i + 1)
  }
  useEffect(() => {
    const start = ((page.current - 1) * 10) / 2
    const end = Math.floor(start + 9 / 2)

    const list = props.reviewList.slice(start, end + 1)
    setList(list)
    setArr(array.slice(page.start, page.end))
  }, [page.current])

  const onPageUp = () => {
    if (page.current < arr[arr.length - 1]) {
      setPage({ ...page, current: page.current + 1 })
    } else if (page.current % page.end === 0 && page.end < pageBlock) {
      setPage({
        start: page.start + 1,
        end: page.end + 1,
        current: page.current + 1
      })
      setArr(array.slice(page.start + 1, page.end + 1))
    }
  }

  const tenPageUP = () => {
    const lastIndex = array.length

    if (lastIndex <= 10 && page.current <= 10) {
      setPage({ ...page, current: lastIndex })
    } else {
      const maxIndex = array[page.current + 9]
      if (maxIndex) {
        setPage({ ...page, current: maxIndex })
      } else {
        setPage({ ...page, current: lastIndex })
      }
    }
    // if (page.current < arr)
  }

  // 음수를 체크 하고  조건에 맞을때 무조건 1페이지로 보내는 변수
  // 마이너스 체크에 클릭된페이지가 담겨있고 Math.sign으로 음수체크
  const tenPageDown = () => {
    const minusCheck = page.current - 10
    if (Math.sign(minusCheck) <= 0) {
      setPage({ ...page, current: 1 })
    } else {
      setPage({ ...page, current: minusCheck })
    }
  }

  const onPageDown = () => {
    if (page.current > arr[0]) {
      setPage({ ...page, current: page.current - 1 })
    } else if (page.current % arr[0] === 0 && page.start >= 1) {
      setPage({
        start: page.start - 1,
        end: page.end - 1,
        current: page.current - 1
      })
      setArr(array.slice(page.start - 1, page.end - 1))
    }
  }

  return (
    <>
      {console.log(props.reviewList)}
      <h4 className="withing-product-detail__desc-title">후기</h4>
      <div className="withing-product-detail__review">
        <ul className="withing-product-detail__review-list">
          {props.reviewList.map(reviewlists => (
            <li className="withing-product-detail__review-item">
              <div className="withing-product-detail__review-link">
                <div className="withing-product-detail__review-num">
                  <span className="c-num"> </span>
                </div>
                <div className="withing-product-detail__review-date">
                  <span className="c-date">{reviewlists.registered}</span>
                </div>
                <div className="withing-product-detail__review-name">
                  <span className="c-name">{reviewlists.nickname}</span>
                </div>
                <div className="withing-product-detail__review-text">
                  <p className="c-text">{reviewlists.comment}</p>
                </div>
                <div className="withing-product-detail__review-img">
                  <a href="#" className="c-img">
                    <img
                      src={
                        "https://ps-service-the-build.s3.ap-northeast-2.amazonaws.com/res/gf_2020_08_27_17_44_26_66_846.jpg"
                      }
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
              className={`page-link ${page.current === a ? "is-active" : ""}`}
              onClick={() => setPage({ ...page, current: a })}
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

export default ReviewBox
