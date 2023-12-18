"use client";

import { Fragment, useState, useEffect, useContext } from "react";

import {
  Form,
  Table,
  Profile,
  Services,
  GetShipment,
  StartShipment,
  CompleteShipment,
} from "../../components/index";

import { TrackingContext } from "../../context/Tracking";

export default function Home() {
  const {
    currentUser,
    createShipment,
    getAllShipments,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [getModel, setGetModel] = useState(false);

  const [allShipmentsData, setAllShipmentsData] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipments();

    return async () => {
      const allData = await getCampaignsData;

      setAllShipmentsData(allData);
    };
  }, []);

  return (
    <Fragment>
      <Services
        setGetModel={setGetModel}
        setStartModal={setStartModal}
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
      />

      <Table
        allShipmentsData={allShipmentsData}
        setCreateShipmentModel={setCreateShipmentModel}
      />

      <Form
        createShipment={createShipment}
        createShipmentModel={createShipmentModel}
        setCreateShipmentModel={setCreateShipmentModel}
      />

      <Profile
        openProfile={openProfile}
        currentUser={currentUser}
        setOpenProfile={setOpenProfile}
        getShipmentsCount={getShipmentsCount}
      />

      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />

      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />

      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
    </Fragment>
  );
}
