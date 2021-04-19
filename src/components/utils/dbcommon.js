//import sqlite3 from "sqlite3"

export default class DBCommon {
    init(){
        // 悲しいことにwebpackはネイティブ系ライブラリが使えないためsqliteを使うすべがない
        /*
        db = new sqlite3.Database('./data/master.db', sqlite3.OPEN_READONLY, (err) => {
            if(err) {
                return alert(err.message);
            }
        });
        */
    }
}