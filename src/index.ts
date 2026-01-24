fouc(() => {
    const img = document.querySelector('img.main-image') as HTMLImageElement

    if (img.complete) {
        document.body.style.opacity = '1'  // prevent FOUC
    } else {
        img.addEventListener('load', () => {
            document.body.style.opacity = '1'
        })
    }
})

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
