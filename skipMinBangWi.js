let mem_no = document.getElementsByName('mem_no')?.[0]?.value || '0000000' // fill in as needed
let cookie = '' //"ch-veil-id=xxxxxx; ch-session-67536=xxxx; connect.sid=xxx"
let mov_order = document.getElementsByName('mov_order')?.[0]?.value || 0
let prof_no = document.getElementsByName('prof_no')?.[0]?.value || 0

let skipTo = (videoObject, timeToSkip) => {
  // try and avoid pauses after seeking
  videoObject.pause()
  videoObject.currentTime = timeToSkip
  var timer = setInterval(function () {
    if (videoObject.readyState == 4 || !videoObject.paused) {
      videoObject.play()
      clearInterval(timer)
    }
  }, 50)
}

let skip = async () => {
  let vidoeObject = document.getElementsByTagName('video')[0]
  let duration = vidoeObject.duration
  let skipToTarget = duration - 1
  skipTo(vidoeObject, skipToTarget)
  await sendAjax(skipToTarget)
  document.getElementsByName('btnclose')[0].click()
}

let sendAjax = async (skipToTarget) => {
  await fetch('https://www.cdec.kr/edu/uptPlayLog', {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Length': '69',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Cookie: cookie,
      DNT: '1',
      Host: 'www.cdec.kr',
      Origin: 'https://www.cdec.kr',
      Pragma: 'no-cache',
      Referer: 'https://www.cdec.kr/edu/basic',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': 'macOS',
    },
    body: new URLSearchParams({
      mem_no: mem_no,
      mov_order: mov_order,
      currenttime: `${skipToTarget}`,
      volume: '1',
      muted: 'false',
      prof_no: prof_no,
    }).toString(),
  })
}

await skip()
