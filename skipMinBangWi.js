const mem_no = document.getElementsByName('mem_no')?.[0]?.value || '0000000' // fill in as needed
const cookie = "" // fill in as needed. example value: "ch-veil-id=a4c5c458-fe5f-430d-bfa7-b257bd461227; ch-session-67536=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZXMiLCJrZXkiOiI2NzUzNi02ODY2NGE0Y2YxY2NiZTNmNWE3ZSIsImlhdCI6MTc1MTUzNDUxOSwiZXhwIjoxNzU0MTI2NTE5fQ.DKJMygLG1XxaJEzeF_yWl0u1Ksi0tcA5bf-hC7aW9_M; connect.sid=s%3AZOPlHW0GS29mzgJB589FsDn-Xse2UOdo.ZRi8wjDQbg9em2X8ZAEwmRwQ7ghuwHWWlRavt7qvZgs"
const mov_order = document.getElementsByName("mov_order")?.[0]?.value || 0

const skipToEnd = (videoObject, timeToSkip) => {
  // try and avoid pauses after seeking
  videoObject.pause()
  videoObject.currentTime = timeToSkip // if this is far enough away from current, it implies a "play" call as well...oddly. I mean seriously that is junk.
  // however if it close enough, then we need to call play manually
  // some shenanigans to try and work around this:
  var timer = setInterval(function () {
    if (videoObject.readyState == 4 || !videoObject.paused) {
      videoObject.play()
      clearInterval(timer)
    }
  }, 50)
}

const skip = async () => {
  let vidoeObject = document.getElementsByTagName('video')[0]
  let duration = vidoeObject.duration
  let skipToTarget = duration - 1
  skipToEnd(vidoeObject, skipToTarget)
  await sendAjax(skipToTarget)
  document.getElementsByName("btnclose")[0].click()
}

const sendAjax = async (skipToTarget) => {
  await fetch("https://www.cdec.kr/education/player/ajax", {
    "method": "POST",
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9,ko;q=0.8",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Content-Length": "69",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie,
      "DNT": "1",
      "Host": "www.cdec.kr",
      "Origin": "https://www.cdec.kr",
      "Pragma": "no-cache",
      "Referer": "https://www.cdec.kr/education/player/basic",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "macOS"
    },
    "body": new URLSearchParams({
      'mem_no': mem_no,
      'mov_order': mov_order,
      'currentTime': `${skipToTarget}`,
      'volume': '1',
      'muted': 'false'
    }).toString()
  })
}

await skip()

