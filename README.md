# Changes from 2025 -> 2026
- The endpoint that periodically receives the progress info changed from `/education/player/ajax` to `/edu/udtPlayLong`
- The request body now requires `prof_no` field, which is also included in the hidden inputs used by other such fields (e.g. `mem_no`).
- The name of the key specifying the current play time (in seconds) changed from `currentTime` to `currenttime`, and it can now receive `float` but `int` still works fine.
- (Not related to the logic for actually skipping the videos) I believe they now respond with a short mp4 chunk after verifying the legitimacy of client request, and the client is supposed to send another "checkpoint" request for the next mp4 chunk. Or you just spoof the current play time (xD).
