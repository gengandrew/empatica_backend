import matplotlib.pyplot as plt
import pymysql
import sys
import gc

if(len(sys.argv) < 2):
    print("Invalid number of paramters!")
    sys.exit()
elif(len(sys.argv) == 2):
    sessionID = sys.argv[1]
    graphTicks = 150
else:
    sessionID = sys.argv[1]
    graphTicks = int(sys.argv[2])


def connect():
    conn = pymysql.connect(host='localhost',
                           user='root',
                           password='12345',
                           db='E4database',
                           charset='utf8')
    c = conn.cursor()
    return conn, c


def mergeSortByTime(inputArray):
    if len(inputArray) > 1:
        middle = len(inputArray)//2
        lefthalf = inputArray[:middle]
        righthalf = inputArray[middle:]
        mergeSortByTime(lefthalf)
        mergeSortByTime(righthalf)

        i = 0
        j = 0
        k = 0
        while i < len(lefthalf) and j < len(righthalf):
            if lefthalf[i][0] <= righthalf[j][0]:
                inputArray[k]=lefthalf[i]
                i=i+1
            else:
                inputArray[k]=righthalf[j]
                j=j+1
            k=k+1

        while i < len(lefthalf):
            inputArray[k]=lefthalf[i]
            i=i+1
            k=k+1

        while j < len(righthalf):
            inputArray[k]=righthalf[j]
            j=j+1
            k=k+1


def getE4Times():
    conn, c = connect()
    query = "SELECT E4Time FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    timeList = [each[0] for each in res]
    # print(timeList)
    return timeList


def getBVP():
    conn, c = connect()
    query = "SELECT UTC, BVP FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    bvpList = [[each[0],each[1]] for each in res]
    mergeSortByTime(bvpList)
    # print(bvpList)
    return bvpList


def getEDA():
    conn, c = connect()
    query = "SELECT UTC, EDA FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    edaList = [[each[0],each[1]] for each in res]
    mergeSortByTime(edaList)
    # print(edaList)
    return edaList


def getIBI():
    conn, c = connect()
    query = "SELECT UTC, IBI FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    ibiList = [[each[0],each[1]] for each in res]
    mergeSortByTime(ibiList)
    # print(ibiList)
    return ibiList


def getHeartRate():
    conn, c = connect()
    query = "SELECT UTC, HeartRate FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    heartRateList = [[each[0],each[1]] for each in res]
    mergeSortByTime(heartRateList)
    # print(heartRateList)
    return heartRateList


def getTemperature():
    conn, c = connect()
    query = "SELECT UTC, Temperature FROM DataTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    temperatureList = [[each[0],each[1]] for each in res]
    mergeSortByTime(temperatureList)
    # print(temperatureList)
    return temperatureList


def graphBVPChart():
    result = getBVP()
    x = []
    y = []
    for each in result:
        x.append(each[0][11:len(each[0])])
        y.append(each[1])
    
    fig, ax = plt.subplots()
    ax.plot(x, y, color='green', linestyle='solid', linewidth=2)
    ax.set_xticks(x[::graphTicks])
    ax.set_xticklabels(x[::graphTicks], rotation=75)
    plt.gcf().subplots_adjust(bottom=0.2)
    plt.xlabel('Time')
    plt.ylabel('BVP Value')
    plt.title('BVP vs Time')
    plt.show()


def graphEDAChart():
    result = getEDA()
    x = []
    y = []
    for each in result:
        x.append(each[0][11:len(each[0])])
        y.append(each[1])
    
    fig, ax = plt.subplots()
    ax.plot(x, y, color='green', linestyle='solid', linewidth=2)
    ax.set_xticks(x[::graphTicks])
    ax.set_xticklabels(x[::graphTicks], rotation=75)
    plt.gcf().subplots_adjust(bottom=0.2)
    plt.xlabel('Time')
    plt.ylabel('EDA Value')
    plt.title('EDA vs Time')
    plt.show()


def graphIBIChart():
    result = getIBI()
    x = []
    y = []
    for each in result:
        x.append(each[0][11:len(each[0])])
        y.append(each[1])
    
    fig, ax = plt.subplots()
    ax.plot(x, y, color='green', linestyle='solid', linewidth=2)
    ax.set_xticks(x[::graphTicks])
    ax.set_xticklabels(x[::graphTicks], rotation=75)
    plt.gcf().subplots_adjust(bottom=0.2)
    plt.xlabel('Time')
    plt.ylabel('IBI Value')
    plt.title('IBI vs Time')
    plt.show()


def graphHeartRateChart():
    result = getHeartRate()
    x = []
    y = []
    for each in result:
        x.append(each[0][11:len(each[0])])
        y.append(each[1])
    
    fig, ax = plt.subplots()
    ax.plot(x, y, color='green', linestyle='solid', linewidth=2)
    ax.set_xticks(x[::graphTicks])
    ax.set_xticklabels(x[::graphTicks], rotation=75)
    plt.gcf().subplots_adjust(bottom=0.2)
    plt.xlabel('Time')
    plt.ylabel('HeartRate Value')
    plt.title('HeartRate vs Time')
    plt.show()


def graphTemperatureChart():
    result = getTemperature()
    x = []
    y = []
    for each in result:
        x.append(each[0][11:len(each[0])])
        y.append(each[1])
    
    fig, ax = plt.subplots()
    ax.plot(x, y, color='green', linestyle='solid', linewidth=2)
    ax.set_xticks(x[::graphTicks])
    ax.set_xticklabels(x[::graphTicks], rotation=75)
    plt.gcf().subplots_adjust(bottom=0.2)
    plt.xlabel('Time')
    plt.ylabel('Temperature Value')
    plt.title('Temperature vs Time')
    plt.show()


graphBVPChart()
graphEDAChart()
graphIBIChart()
graphHeartRateChart()
graphTemperatureChart()