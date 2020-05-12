'use strict';

exports.insertQueryBuilder = function(tbl, fields, values) {

    /*
    *   fields = ['field1', 'field2', 'field3', 'field4']
    *   values = [{item: 'entry1', type: 'string'}, {item: 2, type: 'integer'}, {item: '03/04/2020', type: 'date'}]
    */
   
    if(tbl == null || tbl == undefined || 
        fields == null || fields == undefined || 
        values == null || values == undefined) {
        return "Some of the parameters are null.";
    }

    if(tbl == "" || fields.length == 0 || values.fields == 0) {
        return "Some of the parameters are empty.";
    }

    let query = "INSERT INTO " + tbl + "(";
    for (var i=0; i<fields.length; i++) {
        query = query + fields[i]
        if(i < fields.length - 1) {
            query = query + ", ";
        }
    }

    query = query + ") VALUES (";
    for (var j=0; j<values.length; j++) {
        switch(values[j].type) {
            case "string": 
                query = query + "'" + values[j].item + "'";
                break;
            case "integer":
                query = query + values[j].item;
                break;
            case "date":
                query = query + "'" + values[j].item.substring(0,10) + "'";
                break;
            case "datetime":
                query = query + "'" + values[j].item + "'";
                break;
            default:
                break;
        }
        if(j < fields.length - 1) {
            query = query + ", ";
        }
    }

    query = query + ")";
    console.log("Query: ", query);

    return query;
}

exports.updateQueryBuilder = function(tbl, id, fields, values) {

    /*
    *   fields = ['field1', 'field2', 'field3', 'field4']
    *   values = [{item: 'entry1', type: 'string'}, {item: 2, type: 'integer'}, {item: '03/04/2020', type: 'date'}]
    */
   
    if(tbl == null || tbl == undefined || 
        fields == null || fields == undefined || 
        values == null || values == undefined) {
        return "Some of the parameters are null.";
    }

    if(tbl == "" || fields.length == 0 || values.fields == 0) {
        return "Some of the parameters are empty.";
    }

    let query = "UPDATE " + tbl + " SET ";
    for (var j=0; j<values.length; j++) {
        switch(values[j].type) {
            case "string": 
                query = query + fields[j] + " = '" + values[j].item + "'";
                break;
            case "integer":
                query = query + fields[j] + " = " + values[j].item;
                break;
            case "date":
                query = query + fields[j] + " = '" + values[j].item.substring(0,10) + "'";
                break;
            case "datetime":
                query = query + fields[j] + " = '" + values[j].item + "'";
                break;
            default:
                break;
        }
        if(j < values.length - 1) {
            query = query + ", ";
        }
    }

    query = query + " WHERE " + id.field + " = " + id.no;
    console.log("Query: ", query);

    return query;
}

exports.checkType = function(key) {
    switch(key) {
        case "category" : return "integer";
        default : return "string";
    }
}