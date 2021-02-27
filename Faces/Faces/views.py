from django.http import JsonResponse
import random
import glob
import base64

def send_face(request):
    isGenerated = random.randint(0, 1)

    if isGenerated :
        paths = glob.glob("Assets/ffhq-1024x1024/*.png")
    else :
        paths = glob.glob("Assets/00000/*.png")

    rndIndex = random.randint(0, len(paths)-1)

    with open(paths[rndIndex], "rb") as image_file:
        image_data = base64.b64encode(image_file.read()).decode('utf-8')

    data = [{'picture': image_data, 'isGenerated': isGenerated}]
    
    return JsonResponse(data, safe=False)