'use strict'

const xml2js = require('xml2js');
const Event = require('../models/event');

const saveEvent = (req, res) => {
    let event = new Event();

    let params = req.body;
    event.eventId = params.eventId;
    event.entityType = params.entityType;
    event.effectiveStartDate = new Date(`'${params.effectiveStartDate}'`);
    event.publishedAt = new Date(`'${params.publishedAt}'`);
    event.publishedBy = params.publishedBy;
    event.repost = params.repost;
    event.entityKeys = params.entityKeys;
    event.params = params.params;

    event.save((err, eventSaved) => {
        if(err) res.status(500).send({ message: `Internal Server Error: ${err}` });
        else{
            if(!eventSaved) res.status(404).send({ message: `The event could not be stored` });
            else res.status(200).send({ Result: { message: `The event was created`, eventSaved } })
        }
    });

}

const getEvents = (req, res) => {
    Event.find((err, events) => {
        if(err) res.status(500).send({ message: `Internal Server Error: ${err}` });
        else{
            if(!events) res.status(404).send({ message: `Not events found` });
            else res.status(200).send(events);
        }
    }).sort('eventId');
}

const getEventById = (req, res) => {
    let eventId = req.params.id;

    Event.findOne({eventId: eventId}, (err, event) => {
        if(err) res.status(500).send({ message: `Internal Server Error: ${err}` });
        else{
            if(!event) res.status(404).send({ message: `Event not found` });
            else{
                let response = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns6="http://www.boomi.com/connector/wss" xmlns:ns5="com.successfactors.alert" xmlns:ns7="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns2="com.successfactors.event.notification" xmlns:ns4="http://alert.successfactors.com" xmlns:ns3="http://notification.event.successfactors.com">
                                    <soap:Body>
                                        <ns3:ExternalEvent>
                                            <ns3:externalEventMeta>
                                                <ns3:externalEventId>${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 14)}</ns3:externalEventId>
                                                <ns3:type>com.successfactors.Employment.AssignmentInformation.ReHire</ns3:type>
                                                <ns3:publishedAt>${new Date(event.publishedAt).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}</ns3:publishedAt>
                                                <ns3:publishedBy>${event.publishedBy}</ns3:publishedBy>
                                                <ns3:effective>current</ns3:effective>
                                                <ns3:repost>${event.repost}</ns3:repost>
                                            </ns3:externalEventMeta>
                                            <ns3:events>
                                                <ns3:event>
                                                    <ns3:eventId>${event.eventId}</ns3:eventId>
                                                    <ns3:entityType>${event.entityType}</ns3:entityType>
                                                    <ns3:effectiveStartDate>${new Date(event.effectiveStartDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}</ns3:effectiveStartDate>
                                                    <ns3:publishedAt>${new Date(event.publishedAt).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}</ns3:publishedAt>
                                                    <ns3:publishedBy>${event.publishedBy}</ns3:publishedBy>
                                                    <ns3:repost>${event.repost}</ns3:repost>
                                                    <ns3:entityKeys>
                `
                let entityKeys = '';
                let eks = event.entityKeys;

                eks.forEach(element => {
                    let entity = `
                            <ns3:entityKey>
                                <name>${element.name}</name>
                                <value>${element.value}</value>
                            </ns3:entityKey>
                            `
                        entityKeys += entity;
                });

                let params = `</ns3:entityKeys>
                                <ns3:params>`;
                let pars = event.params;
                pars.forEach(element => {
                    let param = `
                                    <ns3:param>
                                        <name>${element.name}</name>
                                        <value>${element.value}</value>
                                    </ns3:param>
                                `
                        params += param;
                });

                response += entityKeys;
                response += params;
                response += `       </ns3:params>`
                response += `       </ns3:event>
                                        </ns3:events>
                                    </ns3:ExternalEvent>
                                </soap:Body>
                            </soap:Envelope>
                            `
    
                res.type('application/xml')
                res.status(200).send(response);
            } 
        }
    });
}

const editEvent = (req, res) => {
    let eventId = req.params.id;
    let update = req.body;
    Event.findOne({eventId:eventId}, update, (err, eventUpdated) => {
        if(err) res.status(500).send({ message: `Internal Server Error: ${err}` });
        else{
            if(!eventUpdated) res.status(404).send({ message: `Event not found` });
            else res.status(200).send({ Result: { message: `The event was updated`, eventUpdated } });
        }
    });
}

const deleteEvent = (req, res) => {
    let eventId = req.params.id;

    Event.findOneAndRemove({eventId: eventId}, (err, eventDeleted) => {
        if(err) res.status(500).send({ message: `Internal Server Error: ${err}` });
        else{
            if(!eventDeleted) res.status(404).send({ message: `Event not found` });
            else res.status(200).send({ Result: { message: `The event was deleted`, eventDeleted } });
        }
    });
}

const getEventByIdFront = (req, res) => {
    let eventId = req.params.id;

    Event.findOne({eventId: eventId}, (err, event) => {
        if(err) res.status(500).send({ message: `Internal Server Error: ${err}` });
        else{
            if(!event) res.status(404).send({ message: `Event not found` });
            else res.status(200).send(event);
        }
    });
}

module.exports = {
    saveEvent,
    getEvents,
    getEventById,
    editEvent,
    deleteEvent,
    getEventByIdFront
}