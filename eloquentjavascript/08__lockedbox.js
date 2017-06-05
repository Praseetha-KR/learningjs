const box = {
    locked: true,
    unlock() {
        this.locked = false;
    },
    lock() {
        this.locked = true;
    },
    _content: [],
    get content() {
        if (this.locked) throw new Error('Locked!');
        return this._content;
    }
}

function withBoxUnlocked(body) {
    box.unlock();
    body();
    console.log(box.content);
    box.lock();
}

withBoxUnlocked(() => {
    box.content.push('gold');
});

try {
    withBoxUnlocked(() => {
        throw new Error('No access rights. Abort!');
    });
} catch(e) {
    console.log(e);
} finally {
    console.log(box.locked);
}
