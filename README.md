# gulp-version-number #
Add version number to js/css/image in HTML

## usage ##

    var version = require('gulp-version-number');

    gulp.src('src/*.html')
        .pipe(version({
    		... configuration ...
        }))
        .pipe(gulp.dest('build'));

## configuration ##

**config**

    {
    
        /**
         * 全局version取值设置
         * 默认为%MDS%
         */
        'value' : '%MDS%',
    
        /**
         * 关键字替换模式
         * eg:
         *    ['关键字', /regexp/ig, ['关键字'], [/regexp/ig, '%MD5%']]
         */
        'replaces' : [
        
            /**
             * (STRING/REGEXP)
             * 替换关键字, version 取值为全局 config.value
             */
            '#{VERSION_REPlACE}#',
            
            /**
             * (ARRAY)
             * 替换config.replaces[x][0]为config.replaces[x][1]
             * 若不设置config.replaces[x][1]，则version取值为config.value
             */    
            [/#{VERSION_REPlACE}#/g, '%TS%']
        ],
        
        
        /**
         * 追加模式
         * 追加模式 可以 与 替换模式同时存在，将于替换模式执行后执行
         */
        'append' : {
        
            /**
             * 追加的参数
             */
            'key' : '_v',
            
            /**
             * 是否覆盖原参数
             * 默认  0
             * 如果参数中存在版本号关键字，默认被视为“自定义”，不予以覆盖
             * 若需要覆盖，此处cover设置为1
             */
            'cover' : 0,
            
            /**
             * 追加到具体位置
             * (STRING)'all' 包括 css/js/image 全部替换，取值参考全局设置
             * 或
             * (ARRAY)具体项，单独设置css js image的替换规则
             * 不设置则认为无追加，config.append功能无效
             * 成员可以为(STRING/ARRAY/OBJECT)
             * eg:
             *     ['js', ['js'], {type:'js'}, ['css', '%DATE%'] ...]
             */
            'to' : [
            
                /**
                 * (STRING)
                 * 用全局规则替换
                 */
                'css',
                
                /**
                 * (ARRAY)
                 * 指定类别和version的取值, key、cover项参考全局设置，如有需求请使用object方式配置
                 * config.append.to[x][0]必须设置，否则视为无效
                 * config.append.to[x][1]可以省略，取值会使用全局config.value
                 */
                  ['image', '%TS%'],
                  
                /**
                 * (OBJECT)
                 * 用详细的自定义的规则进行替换
                 * 缺失项会取全局中的设置进行补全
                 * type 必须设置，否则视为无效
                 */
                {
                    'type' : 'js',
                    'key' : '_v',
                    'value' : '%DATE%',
                    'cover' : 1
                }
            ]
        },
     
        /**
         * 输出到配置文件
         * !!此功能暂时未实装
         */
        'output' : {
            'file' : 'version.json'
        }
    }

---

**权重 - 覆盖关系**

- (OBJECT)config.append.to[x].type == (ARRAY)config.append.to[x][0] == (STRING)config.append.to[x]
- config.append.to[x].key > config.append.key
- config.append.to[x].cover > config.append.cover
- config.append.to[x].value == config.append.to[x][1] [ (IF cover is TRUE) > (ELSE) == config.replace[x][1] ] > config.value

## options ##

**version types**

- %DATE% 日期 [**YYYYMMDD**]
- %DT% 日期时间 [**YYYYMMDDHHIISS**]
- %TS% 时间戳 [**INT**10]
- %TSM% 时间戳(毫秒级) [**INT**13]
- %MD5% MD5(时间戳) [**STRING**32]
- %MDS% MD5(MD5(时间戳)+salt) [**STRING**32]
- (STRING) 非以上关键字视为自定义


## change log ##

##### = 0.1.1 = #####
- output功能实装，将版本输出到文件。


##### = 0.1.1 = #####
- 修复正则功能

##### = 0.1.0 = #####
**I was born**
