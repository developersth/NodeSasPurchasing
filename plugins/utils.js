var fs = require('fs');
var path = require('path');
class Utils {
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2)
            month = '0' + month
        if (day.length < 2)
            day = '0' + day

        return `${year.toString().substr(-2)}${month}${day}`
    }
    padLeft(nr, n, str) {
        return Array(n - String(nr).length + 1).join(str || '0') + nr;
    }
    formatDocNo(id) {
        return `DOC${this.formatDate(new Date())}-${this.padLeft(id, 5)}`
    }
    test() {
        return 'test'
    }
    copy(file, newPath) {
        var fs = require('fs');
        var path = require('path');

        //gets file name and adds it to dir2
        var f = path.basename(file);
        var dest = path.resolve(newPath, f);

        fs.rename(file, dest, (err) => {
            if (err) throw err;
            else console.log('Successfully moved');
        });
    }
    createDirectory(pathname) {
        const __dirname = path.resolve();
        //pathname = path.join('public', pathname)
        pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
        fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, e => {
            if (e) {
                console.error(e);
            } else {
                console.log(`Create ${pathname} Success`);
            }
        });
    }
    
}
module.exports = new Utils()