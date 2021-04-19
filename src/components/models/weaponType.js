import DBCommon from "../utils/dbcommon"

const tableName = "weapon_type";
export default class WeaponType {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAll() {
        const db = DBCommon.get()
        const result = []
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(
                    `SELECT id, name FROM ${tableName} ORDER BY order`,
                    (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        rows.forEach(row => {
                            result.push(new WeaponType(row["id"], row["name"]))
                        });
                        return resolve(result);
                    }
                );
            });
        });
    }
}