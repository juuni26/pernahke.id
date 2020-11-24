<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Pernahke landing</title>
        <link rel="shortcut icon" href="https://www.iconninja.com/files/795/910/519/flash-saver-superhero-earth-super-hero-man-icon.svg" type="image/x-icon">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 4rem;
            }
.m-b-md{
    margin-bottom: 5vh;
}
           
           .undergoing {
               position: absolute;
               left: 50%;
               transform: translateX(-50%);
               bottom: 2vh;
           }

            
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    Pernahke.id
                </div>
            <div>
            <img src="https://i.pinimg.com/originals/0d/db/85/0ddb85a5136c466444647c7f8070425e.gif" alt="">
            </div>
               
            </div>
            <div class="undergoing">
            underprocess . . .</div>
        </div>
    </body>
</html>
