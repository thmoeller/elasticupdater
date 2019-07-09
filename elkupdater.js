var fs = require('fs');
var request = require('request');
var AdmZip = require('adm-zip');
var version = process.argv[2]
var tfolder = process.argv[3]


var urlList = [
    "https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/logstash/logstash-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/kibana/kibana-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/apm-server/apm-server-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/beats/packetbeat/packetbeat-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/beats/winlogbeat/winlogbeat-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/beats/heartbeat/heartbeat-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/beats/auditbeat/auditbeat-" + version + "-windows-x86_64.zip",
    "https://artifacts.elastic.co/downloads/beats/functionbeat/functionbeat-" + version + "-windows-x86_64.zip"]

var download = function (myurl, dest, callback) {

    if (process.argv[4] === 'company') {
        
        request.get({
            gzip: true,
            tunnel: false,
            url: myurl,
            proxy: 'https://127.0.0.1:3128'            
        }).on('error', function (err) { console.log(err) })
          .pipe(fs.createWriteStream(dest))
          .on('close', callback);

    }
    else {

        request.get(myurl)
            .on('error', function (err) { console.log(err) })
            .pipe(fs.createWriteStream(dest))
            .on('close', callback);

    }

};

var saveConfig = function (callback) { 

    fs.createReadStream('../ELK/elasticsearch/config/elasticsearch.yml').pipe(fs.createWriteStream('../ELK/save/elasticsearch.yml')).on('error', function (err) { console.log(err); throw err });
    fs.createReadStream('../ELK/kibana/config/kibana.yml').pipe(fs.createWriteStream('../ELK/save/kibana.yml')).on('error',function (err) { console.log(err); throw err });
    fs.createReadStream('../ELK/logstash/config/logstash.yml').pipe(fs.createWriteStream('../ELK/save/logstash.yml')).on('error',function (err) { console.log(err); throw err });
    fs.createReadStream('../ELK/packetbeat/packetbeat.yml').pipe(fs.createWriteStream('../ELK/save/packetbeat.yml')).on('error',function (err) { console.log(err); throw err });
    callback(null, 'Saved');
}

saveConfig(function(err) {
    if (err) { console.log(err) }
    else {
        console.log("Configurations saved! ");
    };
});

urlList.forEach(function (str) {
    var filename = str.split('/').pop();
    var fname = filename.split('-')
    var folder = fname.shift();
    console.log('Downloading ' + filename);
    download(str, "./downloads/" + filename, function () {
        console.log('Finished Downloading ' + filename)
        console.log('Start Unzip ' + filename)
        var zip = new AdmZip("./downloads/" + filename);
        zip.extractAllTo(/*target path like ./elastic/ */ tfolder + folder + "/", /*overwrite*/ true);;
    });
});
