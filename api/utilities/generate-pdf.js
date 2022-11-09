const puppeteer = require('puppeteer');

const hbs = require('handlebars')

const fs = require('fs-extra')

const path = require('path')

module.exports = {
    generatPDF: async function(data) {
        try{
            const browser = await puppeteer.launch()
    
            const page = await browser.newPage()
    
            const content = await compile('ticket',data)
    
            await page.setContent(content)
    
           let file = await page.pdf({
                path:'output.pdf',
                format:'A4',
                printBackground:true,
                landscape: true
            })
    
           const base64File = file.toString('base64')
            
            // console.log({file})
    
            
            return base64File;
            // await browser.close()
    
            // process.exit()
    
        }catch(e){
            console.log(e)
        }
    }
  };
  

const compile = async function (templateName,data){
    const filePath = path.join(process.cwd(),'api/template',`${templateName}.hbs`)

    const html = await fs.readFile(filePath,'utf8')
    return hbs.compile(html)(data)
};