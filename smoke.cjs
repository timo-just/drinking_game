const http=require('http'), fs=require('fs'),{spawn}=require('child_process');
const qa=`<script>
window.addEventListener('load',()=>{const errors=[];window.onerror=(m)=>errors.push(String(m));let tested=0;
const click=t=>{const b=[...app.querySelectorAll('button')].find(b=>b.textContent===t);if(!b)throw Error('Button fehlt: '+t);b.click()};
for(let i=0;i<games.length;i++){try{start(i);if(!app.textContent.trim())throw Error('Leere Ansicht');const ready=[...app.querySelectorAll('button')].find(b=>b.textContent==='Ich bin bereit');if(ready)ready.click();tested++;}catch(e){errors.push(games[i][1]+': '+e.message)}}
try{
players=['Alpha','Beta','Gamma'];
start(7);for(let i=0;i<3;i++){click('Ich bin bereit');$('#range').value=i===2?0:50;click('So passt es')}if(!app.textContent.includes('Die Runde ist entschieden'))throw Error('Flächenrunde endet nicht');
start(22);click('Geheim abstimmen');for(let i=0;i<3;i++){click('Ich bin bereit');$('#actions').children[i===2?1:0].click()}if(!app.querySelector('.pink').textContent.includes('Gamma'))throw Error('Mehrheit falsch gewertet');
start(23);for(let i=0;i<3;i++){click('Ich bin bereit');$('#v').value=['Apfel','Birne','Kirsche'][i];$('#identity').requestSubmit()}for(let i=0;i<3;i++){click('Ich bin bereit');const own=['Birne','Kirsche','Apfel'][i];if(app.textContent.includes(own))throw Error('Eigene Identität sichtbar');click('Verdecken & weiter')}
start(24);for(let i=0;i<3;i++){click('Ich bin bereit');if(!app.textContent.includes('geheime Rolle'))throw Error('Rolle fehlt');click('Rolle verdecken')}if(!app.textContent.includes('Diskutieren'))throw Error('Imposter-Übergabe');
start(19);click('Fünf Sekunden starten');home();if(cleanup.length)throw Error('Timer nicht aufgeräumt');
}catch(e){errors.push('Spielfluss: '+e.message)}
try{ranked([{name:players[0],value:10},{name:players[1],value:20}]);if(!app.textContent.includes(players[1]))throw Error('Rangliste');mates=[[players[0],players[1]]];if(!drink([players[0]]).includes(players[1]))throw Error('Trinkmates');mates=[];home();if(document.querySelectorAll('.game').length!==28)throw Error('Spielemenü');}catch(e){errors.push(e.message)}
clear();document.body.innerHTML='<pre id="qa">'+JSON.stringify({tested,errors})+'</pre>';
});</script>`;
const server=http.createServer((req,res)=>{const path=req.url==='/'?'index.html':req.url.slice(1);if(!['index.html','app.js','style.css'].includes(path)){res.writeHead(404);return res.end()}res.setHeader('Content-Type',path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(path,'utf8')+(path==='index.html'?qa:''))});
server.listen(4173,'127.0.0.1',()=>{const browser=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--user-data-dir=D:/Drinking Game/.qa-chrome','--dump-dom','--timeout=10000','http://127.0.0.1:4173/'],{stdio:['ignore','pipe','pipe']});let output='';browser.stdout.on('data',d=>output+=d);browser.on('close',()=>{console.log(output);server.close();if(!output.includes('&quot;errors&quot;:[]')&&!output.includes('"errors":[]'))process.exitCode=1});setTimeout(()=>{browser.kill();server.close()},20000).unref()});
