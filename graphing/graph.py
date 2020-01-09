import matplotlib.pyplot as plt
import pymysql
import sys
import gc

sessionID = sys.argv[1]


def connect():
    conn = pymysql.connect(host='localhost',
                           user='root',
                           password='12345',
                           db='E4database',
                           charset='utf8')
    c = conn.cursor()
    return conn, c


def getE4Times():
    conn, c = connect()
    query = "SELECT E4Time FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    timeList = [each[0] for each in res]
    #print(timeList)
    return timeList


def getUTC():
    conn, c = connect()
    query = "SELECT UTC FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    utcList = [each[0] for each in res]
    #print(utcList)
    return utcList


def getBVP():
    conn, c = connect()
    query = "SELECT BVP FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    bvpList = [each[0] for each in res]
    #print(bvpList)
    return bvpList


def getEDA():
    conn, c = connect()
    query = "SELECT EDA FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    edaList = [each[0] for each in res]
    #print(edaList)
    return edaList


def getIBI():
    conn, c = connect()
    query = "SELECT IBI FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    ibiList = [each[0] for each in res]
    #print(ibiList)
    return ibiList


def getHeartRate():
    conn, c = connect()
    query = "SELECT HeartRate FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    heartRateList = [each[0] for each in res]
    #print(heartRateList)
    return heartRateList


def getTemperature():
    conn, c = connect()
    query = "SELECT Temperature FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    temperatureList = [each[0] for each in res]
    #print(temperatureList)
    return temperatureList


def getXList(input):
    x = []
    index = 0
    for each in input:
        x.append(index)
        index = index + 1

    return x


def graphBVPChart():
    y = getBVP()
    x = getXList(y)
    plt.plot(x, y, color='green', linestyle='solid', linewidth=2)
    plt.xlim(min(x) - 1, max(x) + 1)
    plt.ylim(min(y) - 1, max(y) + 1)
    plt.xlabel('Time')
    plt.ylabel('BVP Value')
    plt.title('BVP vs Time')
    plt.show()


def graphEDAChart():
    y = getEDA()
    x = getXList(y)
    plt.plot(x, y, color='green', linestyle='solid', linewidth=2)
    plt.xlim(min(x) - 1, max(x) + 1)
    plt.ylim(min(y) - 1, max(y) + 1)
    plt.xlabel('Time')
    plt.ylabel('EDA Value')
    plt.title('EDA vs Time')
    plt.show()


def graphIBIChart():
    y = getIBI()
    x = getXList(y)
    plt.plot(x, y, color='green', linestyle='solid', linewidth=2)
    plt.xlim(min(x) - 1, max(x) + 1)
    plt.ylim(min(y) - 1, max(y) + 1)
    plt.xlabel('Time')
    plt.ylabel('IBI Value')
    plt.title('IBI vs Time')
    plt.show()


def graphHeartRateChart():
    y = getHeartRate()
    x = getXList(y)
    plt.plot(x, y, color='green', linestyle='solid', linewidth=2)
    plt.xlim(min(x) - 1, max(x) + 1)
    plt.ylim(min(y) - 1, max(y) + 1)
    plt.xlabel('Time')
    plt.ylabel('HeartRate Value')
    plt.title('HeartRate vs Time')
    plt.show()


def graphTemperatureChart():
    y = getTemperature()
    x = getXList(y)
    plt.plot(x, y, color='green', linestyle='solid', linewidth=2)
    plt.xlim(min(x) - 1, max(x) + 1)
    plt.ylim(min(y) - 1, max(y) + 1)
    plt.xlabel('Time')
    plt.ylabel('Temperature Value')
    plt.title('Temperature vs Time')
    plt.show()


graphBVPChart()
graphEDAChart()
graphIBIChart()
graphHeartRateChart()
graphTemperatureChart()