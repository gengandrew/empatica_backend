import pandas as pd
import numpy as np
import pymysql
import gc

path = "./csv"

def connect():
    conn = pymysql.connect(host='localhost',
                           user='root',
                           password='12345',
                           db='DEASA_Database',
                           charset='utf8')
    c = conn.cursor()
    return conn, c

def getDataTable():
    conn, c = connect()
    query = "SELECT * FROM DataTable;"
    c.execute(query)
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    return res

def getAccelerationTable():
    conn, c = connect()
    query = "SELECT * FROM AccelerationTable;"
    c.execute(query)
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    return res

def getResponderTable():
    conn, c = connect()
    query = "SELECT * FROM ResponderTable;"
    c.execute(query)
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    return res

def getVolumeTable():
    conn, c = connect()
    query = "SELECT * FROM VolumeTable;"
    c.execute(query)
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    return res

def getFaceTable():
    conn, c = connect()
    query = "SELECT * FROM FaceTable;"
    c.execute(query)
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    return res

def dataTableCSV():
    table_data = np.array(getDataTable())
    table_frame = pd.DataFrame(table_data)
    table_frame = table_frame.rename(columns={0:"PrimaryKey", 1:"SessionID", 2:"UTC", 3:"E4Time", 4:"BVP", 5:"EDA", 6:"IBI", 7:"HeartRate", 8:"Temperature"})
    table_frame.to_csv(path + "/DataTable.csv")

def accelerationTableCSV():
    table_data = np.array(getAccelerationTable())
    table_frame = pd.DataFrame(table_data)
    table_frame = table_frame.rename(columns={0:"PrimaryKey", 1:"SessionID", 2:"UTC", 3:"E4Time", 4:"AccelX", 5:"AccelY", 6:"AccelZ"})
    table_frame.to_csv(path + "/AccelerationTable.csv")

def responderTableCSV():
    table_data = np.array(getResponderTable())
    table_frame = pd.DataFrame(table_data)
    table_frame = table_frame.rename(columns={0:"PrimaryKey", 1:"SessionID", 2:"UTC", 3:"Custom_Action", 4:"Custom_Message"})
    table_frame.to_csv(path + "/ResponderTable.csv")

def volumeTableCSV():
    table_data = np.array(getVolumeTable())
    table_frame = pd.DataFrame(table_data)
    table_frame = table_frame.rename(columns={0:"PrimaryKey", 1:"SessionID", 2:"UTC", 3:"SoundLevel"})
    table_frame.to_csv(path + "/VolumeTable.csv")

def faceTableCSV():
    table_data = np.array(getFaceTable())
    table_frame = pd.DataFrame(table_data)
    table_frame = table_frame.rename(columns={0:"PrimaryKey", 1:"SessionID", 2:"UTC", 3:"Landmark_Number", 4:"Distance"})
    table_frame.to_csv(path + "/FaceTable.csv")

dataTableCSV()
accelerationTableCSV()
responderTableCSV()
volumeTableCSV()
faceTableCSV()