$(()=>{
    $('#jusUrl').val('')
})

$('#jusBtn').on('click', ()=>{
    let url = $('#jusUrl').val()
    $.ajaxPrefilter( options => {
        if (options.crossDomain && jQuery.support.cors) {
          let http = (window.location.protocol === 'http:' ? 'http:' : 'https:')
          options.url = http + '//cors-anywhere.herokuapp.com/' + options.url
          //options.url = "http://cors.corsproxy.io/url=" + options.url;
        }
    });
    $.get(
        url,
        response => {
            let $html = $('<div />', {html:response})
            tribunal = url.replace('https://', '').split('.')[0].toUpperCase()
            let description = Array()
            let title = Array()
            let content = $html.find('.JurisprudenceContent.JurisprudencePage-content p').text()
            
            $html.find('.JurisprudenceGeneralData-title').text((index, text)=>{
                title.push(text)
            })

            $html.find('.JurisprudenceGeneralData-description').text((index, text)=>{
                description.push(text)
            })

            $html.remove()

            let footer = '(Tribunal: ' + tribunal + ', '
            title.forEach((val, idx)=>{
                footer = `${footer}${val}: ${description[idx]}, `
            })
            footer = footer.substr(0, footer.length -2) + ')'

            let result = `${content}\n${footer}`

            $('#body-modal').html(result)
            $('#modalResult').modal('show')
            $('#body-modal').select()

        }
    )
        
})

function copyToClipboard (element) {
    let $temp = $("<textarea></textarea>")
    $('#modal-copy').append($temp)
    $temp.val($(element).text())
    $temp.select()
    document.execCommand("copy")
    $temp.remove()
    $('#copied').html('Texto copiado!')
}
