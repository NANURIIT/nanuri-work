/** common **/
'use strict';

/** onload **/
$(function(){
    searchBoardList();
});

function searchBoardList(){
    let param = {bultTypCd : "NOTICE"};
    ajaxCall({
        method : 'GET', 
        url : '/admin/boardList',
        data : param,
        success : searchBoardListCB
    })
}

function searchBoardListCB(object){
    console.log(object);
    let BOARD_LIST_HTML = '';

    for(let i = 0; i < object.length; i++) {
        BOARD_LIST_HTML += '<tr>';
        BOARD_LIST_HTML += '    <td>'+object[i].seqNo+'</td>';
        BOARD_LIST_HTML += '    <td><a href="/admin/noticeDetail/'+object[i].seqNo+'">'+object[i].bultTitlNm+'</a></td>';
        BOARD_LIST_HTML += '    <td>'+object[i].rgmnNm+'</td>';
        BOARD_LIST_HTML += '    <td>'+object[i].rgDtm.substring(0, 11)+'</td>';
        BOARD_LIST_HTML += '</tr>';
    }
    $('.notice_list > table > tbody').html(BOARD_LIST_HTML);
}