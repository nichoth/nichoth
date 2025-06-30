function fouc (cb:()=>any) {
    if (document.readyState !== 'loading') {
        // start things
        cb()
    } else {
        // still loading
        // wait for event
        document.addEventListener('DOMContentLoaded', cb)
    }
}

fouc(() => {
    document.body.style.opacity = '1'  // prevent FOUC
})
