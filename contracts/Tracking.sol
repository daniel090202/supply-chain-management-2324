// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus {
        PENDING,
        IN_TRANSIT,
        DELIVERED
    }

    struct Shipment {
        address sender;
        address receiver;
        uint256 price;
        uint256 distance;
        uint256 pickupTime;
        uint256 deliveryTime;
        bool isPaid;
        ShipmentStatus status;
    }

    uint256 public shipmentCount;

    mapping(address => Shipment[]) public shipments;

    struct TypeShipment {
        address sender;
        address receiver;
        uint256 price;
        uint256 distance;
        uint256 pickupTime;
        uint256 deliveryTime;
        bool isPaid;
        ShipmentStatus status;
    }

    TypeShipment[] typeShipments;

    event ShipmentCreated(
        address indexed sender,
        address indexed receiver,
        uint256 price,
        uint256 distance,
        uint256 pickupTime
    );

    event ShipmentInTransit(
        address indexed sender,
        address indexed receiver,
        uint256 pickupTime
    );

    event ShipmentDelivered(
        address indexed sender,
        address indexed receiver,
        uint256 deliveryTime
    );

    event ShipmentPaid(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(
        address _receiver,
        uint256 _price,
        uint256 _distance,
        uint256 _pickupTime
    ) public payable {
        require(msg.value == _price, "Payment must match the price.");

        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            _price,
            _distance,
            _pickupTime,
            0,
            false,
            ShipmentStatus.PENDING
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        typeShipments.push(
            TypeShipment(
                msg.sender,
                _receiver,
                _price,
                _distance,
                _pickupTime,
                0,
                false,
                ShipmentStatus.PENDING
            )
        );

        emit ShipmentCreated(
            msg.sender,
            _receiver,
            _price,
            _distance,
            _pickupTime
        );
    }

    function startShipment(
        address _sender,
        address _receiver,
        uint256 _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver.");
        require(
            shipment.status == ShipmentStatus.PENDING,
            "Shipment has been already in transit."
        );

        shipment.status = ShipmentStatus.IN_TRANSIT;
        typeShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    function completeShipment(
        address _sender,
        address _receiver,
        uint256 _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver.");
        require(
            shipment.status == ShipmentStatus.IN_TRANSIT,
            "Shipment has not been in transit."
        );
        require(!shipment.isPaid, "Shipment has alreadt been paid.");

        shipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;

        typeShipment.status = ShipmentStatus.DELIVERED;
        typeShipment.deliveryTime = block.timestamp;

        uint256 amount = shipment.price;

        payable(shipment.sender).transfer(amount);

        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    function getShipment(
        address _sender,
        uint256 _index
    )
        public
        view
        returns (
            address,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            ShipmentStatus
        )
    {
        Shipment memory shipment = shipments[_sender][_index];

        return (
            shipment.sender,
            shipment.receiver,
            shipment.price,
            shipment.distance,
            shipment.pickupTime,
            shipment.deliveryTime,
            shipment.isPaid,
            shipment.status
        );
    }

    function getShipmentsCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }

    function getAllTransactions() public view returns (TypeShipment[] memory) {
        return typeShipments;
    }
}
