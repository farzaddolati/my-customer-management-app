const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StationLogs', {
    Id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    EndSaveMoment: {
      type: DataTypes.DATE,
      allowNull: true
    },
    BeginSaveMoment: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Well_Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PreviousLog_Id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    NextLog_Id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    InitMoment: {
      type: DataTypes.DATE,
      allowNull: true
    },
    RemoteAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LV: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TM: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TT: {
      type: DataTypes.DATE,
      allowNull: true
    },
    OriginalTM: {
      type: DataTypes.DATE,
      allowNull: true
    },
    OriginalTT: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DV: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TypeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PS: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DB: {
      type: DataTypes.REAL,
      allowNull: true
    },
    GUI: {
      type: DataTypes.REAL,
      allowNull: true
    },
    GS: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SC: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    A00: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A01: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A02: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A03: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A04: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    A05: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A06: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    A07: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A08: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A09: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A10: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A11: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A12: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A13: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    A14: {
      type: DataTypes.REAL,
      allowNull: true
    },
    M01: {
      type: DataTypes.REAL,
      allowNull: true
    },
    C01: {
      type: DataTypes.REAL,
      allowNull: true
    },
    K01: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K02: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K03: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K04: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K05: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K06: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K07: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K08: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K09: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    K10: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Long: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Lat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    CpuId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DifferentialC01: {
      type: DataTypes.REAL,
      allowNull: true
    },
    DifferentialA01: {
      type: DataTypes.REAL,
      allowNull: true
    },
    DifferentialA02: {
      type: DataTypes.REAL,
      allowNull: true
    },
    DifferentialA04: {
      type: DataTypes.REAL,
      allowNull: true
    },
    A01BatchNumber: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    A02BatchNumber: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    A04BatchNumber: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    SR: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SZ: {
      type: DataTypes.REAL,
      allowNull: true
    },
    AnalogType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Quality1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Quality2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OverUsage: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'StationLogs',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_StationLogs",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
