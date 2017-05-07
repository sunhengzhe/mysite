function wrap(results) {
    return results.map((item, index) => {
        const { mod, createdBy, size, updatedAt, name } = item;
        return {
            hasHead: false,
            text: `${mod} ${createdBy} ${size} ${updatedAt} ${name}`,
        };
    });
}

function main() {
    const results = [
        {
            name: 'Applications',
            size: '136',
            createdBy: 'sunhengzhe',
            mod: 'drwx------+',
            updatedAt: '2017-03-21 18:02:32',
        }, {
            name: 'Documents',
            size: '578',
            createdBy: 'sunhengzhe',
            mod: 'drwx--x--x+',
            updatedAt: '2017-03-21 18:02:32',
        }, {
            name: 'Downloads',
            size: '374',
            createdBy: 'sunhengzhe',
            mod: 'drwx------+',
            updatedAt: '2017-03-21 18:02:32',
        }
    ]

    return wrap(results);
}

module.exports =  main;
